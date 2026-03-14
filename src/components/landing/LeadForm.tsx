"use client";

import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

import {
  budgetRangeLabels,
  budgetRanges,
  defaultLeadFormValues,
  projectTypeLabels,
  projectTypes,
} from "@/lib/site-content";
import type { LeadFormValues } from "@/lib/types";
import styles from "@/components/landing/LeadForm.module.css";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  phone: z
    .string()
    .trim()
    .regex(/^[+0-9()\s-]{10,20}$/, "Please enter a valid phone number."),
  projectType: z.enum(projectTypes, {
    message: "Please choose a project type.",
  }),
  region: z.string().trim().min(2, "Please enter the project region."),
  budgetRange: z.enum(budgetRanges, {
    message: "Please choose a budget range.",
  }),
  message: z.string().trim().min(20, "Please describe the brief in at least 20 characters."),
  consent: z.boolean().refine((value) => value, {
    message: "Consent is required.",
  }),
});

type FieldErrors = Partial<Record<keyof LeadFormValues, string>>;

export function LeadForm() {
  const [values, setValues] = useState<LeadFormValues>(defaultLeadFormValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = <Key extends keyof LeadFormValues>(key: Key, value: LeadFormValues[Key]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsed = leadSchema.safeParse(values);

    if (!parsed.success) {
      const nextErrors: FieldErrors = {};

      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0];

        if (typeof field === "string" && !(field in nextErrors)) {
          nextErrors[field as keyof LeadFormValues] = issue.message;
        }
      });

      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    await new Promise((resolve) => {
      window.setTimeout(resolve, 1400);
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className={styles.successCard}>
        <CheckCircle2 size={24} />
        <div className={styles.successTitle}>Consultation request recorded</div>
        <p>Thank you. We will return with a first strategic reading of the brief.</p>
        <button
          type="button"
          className="button-secondary"
          onClick={() => {
            setValues(defaultLeadFormValues);
            setErrors({});
            setIsSubmitted(false);
          }}
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formIntro}>
        <span className="section-label">Dossier</span>
        <p>Project scope, geography and budget frame. Keep it concise.</p>
      </div>

      <div className={styles.grid}>
        <label className={styles.field}>
          <span>Name</span>
          <input
            type="text"
            value={values.name}
            onChange={(event) => updateField("name", event.currentTarget.value)}
            placeholder="How should we address you?"
          />
          {errors.name ? <small>{errors.name}</small> : null}
        </label>

        <label className={styles.field}>
          <span>Phone</span>
          <input
            type="tel"
            value={values.phone}
            onChange={(event) => updateField("phone", event.currentTarget.value)}
            placeholder="+7 (999) 000-00-00"
          />
          {errors.phone ? <small>{errors.phone}</small> : null}
        </label>

        <label className={styles.field}>
          <span>Project type</span>
          <select
            value={values.projectType}
            onChange={(event) =>
              updateField("projectType", event.currentTarget.value as LeadFormValues["projectType"])
            }
          >
            {projectTypes.map((option) => (
              <option key={option} value={option}>
                {projectTypeLabels[option]}
              </option>
            ))}
          </select>
          {errors.projectType ? <small>{errors.projectType}</small> : null}
        </label>

        <label className={styles.field}>
          <span>Region</span>
          <input
            type="text"
            value={values.region}
            onChange={(event) => updateField("region", event.currentTarget.value)}
            placeholder="Moscow, Istra, Sochi"
          />
          {errors.region ? <small>{errors.region}</small> : null}
        </label>

        <label className={styles.field}>
          <span>Budget</span>
          <select
            value={values.budgetRange}
            onChange={(event) =>
              updateField(
                "budgetRange",
                event.currentTarget.value as LeadFormValues["budgetRange"],
              )
            }
          >
            {budgetRanges.map((option) => (
              <option key={option} value={option}>
                {budgetRangeLabels[option]}
              </option>
            ))}
          </select>
          {errors.budgetRange ? <small>{errors.budgetRange}</small> : null}
        </label>
      </div>

      <label className={styles.field}>
        <span>Brief</span>
        <textarea
          value={values.message}
          onChange={(event) => updateField("message", event.currentTarget.value)}
          placeholder="Describe the site, timeline, architectural direction and key constraints."
          rows={5}
        />
        {errors.message ? <small>{errors.message}</small> : null}
      </label>

      <label className={styles.consent}>
        <input
          type="checkbox"
          checked={values.consent}
          onChange={(event) => updateField("consent", event.currentTarget.checked)}
        />
        <span>
          I agree to the processing of my data for a consultation reply.
        </span>
      </label>
      {errors.consent ? <small className={styles.consentError}>{errors.consent}</small> : null}

      <button type="submit" className="button-primary" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <LoaderCircle size={18} className={styles.spinner} />
            Preparing dossier
          </>
        ) : (
          <>
            Send request
            <ArrowRight size={16} />
          </>
        )}
      </button>
    </form>
  );
}
