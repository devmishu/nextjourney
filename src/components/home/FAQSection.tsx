"use client";

import React from "react";
import {
  FiShoppingBag,
  FiFileText,
  FiCreditCard,
  FiBox,
  FiGlobe,
  FiRefreshCw,
  FiChevronDown,
} from "react-icons/fi";
import { Accordion } from "@heroui/react";

const items = [
  {
    question: "How do I place an order?",
    answer:
      "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase.",
    icon: <FiShoppingBag />,
  },
  {
    question: "Can I modify or cancel my order?",
    answer:
      "Yes, you can modify or cancel your order before it's shipped. Once your order is processed, you can't make changes.",
    icon: <FiFileText />,
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, including Visa, Mastercard, and American Express.",
    icon: <FiCreditCard />,
  },
  {
    question: "How much does shipping cost?",
    answer:
      "Shipping costs vary based on your location and the size of your order. We offer free shipping for orders over $50.",
    icon: <FiBox />,
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to most countries. Please check our shipping rates and policies for more information.",
    icon: <FiGlobe />,
  },
  {
    question: "How do I request a refund?",
    answer:
      "If you're not satisfied with your purchase, you can request a refund within 30 days of purchase. Please contact our customer support team for assistance.",
    icon: <FiRefreshCw />,
  },
];

export default function FAQSection() {
  return (
    <section className=" py-16 md:py-24 transition-colors duration-300">
      <div className="app-container max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-black text-primary text-center mb-12 tracking-tight">
          Frequently Asked Questions
        </h2>

        <Accordion className="w-full flex flex-col gap-4">
          {items.map((item, index) => (
            <Accordion.Item key={index} className="card-primary border-none">
              <Accordion.Heading>
                <Accordion.Trigger className="flex items-center justify-between w-full p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-xl transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-[#028A65] dark:text-emerald-400 size-5 shrink-0">
                      {item.icon}
                    </span>
                    <span className="font-semibold text-primary">
                      {item.question}
                    </span>
                  </div>
                  <Accordion.Indicator>
                    <FiChevronDown className="text-secondary" />
                  </Accordion.Indicator>
                </Accordion.Trigger>
              </Accordion.Heading>

              <Accordion.Panel>
                <Accordion.Body className="p-4 pt-0 text-secondary leading-relaxed pl-12">
                  {item.answer}
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
