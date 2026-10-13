"use client";

import { FormEvent, useState } from "react";
import { serviceOptions } from "@/lib/services";
const companySizes = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];
type Status = "idle" | "loading" | "success" | "error";

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(data.message || "Please check the form and try again.");
      }
      setStatus("success");
      setMessage(data.message || "Your request has been received.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <form className={compact ? "lead-form lead-form-compact" : "lead-form"} onSubmit={submit} noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="honeypot"
      />
      <div className="form-grid">
        <label>
          Full Name
          <input name="fullName" type="text" autoComplete="name" required minLength={2} />
        </label>
        <label>
          Business Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          Company
          <input name="company" type="text" autoComplete="organization" required minLength={2} />
        </label>
        <label>
          Service Required
          <select name="service" required defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          Company Size
          <select name="companySize" required defaultValue="">
            <option value="" disabled>
              Select company size
            </option>
            {companySizes.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Message / Security Requirement
        <textarea name="requirement" required minLength={10} rows={compact ? 4 : 6} />
      </label>
      <label className="checkbox-row">
        <input name="consent" type="checkbox" value="true" required />
        <span>
          I consent to being contacted by email about this security requirement and understand that no
          sensitive credentials should be submitted through this form.
        </span>
      </label>
      <button className="button button-primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Submitting..." : "Request a Security Assessment"}
      </button>
      <p className={`form-status form-${status}`} role="status" aria-live="polite">
        {message || " "}
      </p>
    </form>
  );
}
