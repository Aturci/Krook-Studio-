"use client";

import { useState } from "react";
import InquiryForm from "./InquiryForm";

type ContactButtonsProps = {
  subject: string;
};

export default function ContactButtons({ subject }: ContactButtonsProps) {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setFormOpen(true)}
          className="px-5 py-3 bg-terracotta text-bone font-sans text-xs tracking-[0.2em] uppercase hover:bg-terracotta/80 transition-colors duration-200"
        >
          Inquire about this piece
        </button>
        <a
          href="https://ig.me/m/krook.studio"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 bg-petrol text-bone font-sans text-xs tracking-[0.2em] uppercase hover:bg-petrol/80 transition-colors duration-200"
        >
          Message on Instagram
        </a>
      </div>

      <InquiryForm
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        subject={subject}
      />
    </>
  );
}
