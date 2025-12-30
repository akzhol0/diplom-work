import { test } from "node:test";
import assert from "node:assert";
import { isValidEmail, formatDate, getStatusMessage } from "./logic.js";

test("Email validation", () => {
  assert.strictEqual(isValidEmail("test@mail.com"), true);
  assert.strictEqual(isValidEmail("invalid-email"), false);
});

test("Date formatting", () => {
  assert.strictEqual(formatDate(null), "Date not provided");
  assert.strictEqual(formatDate("2025-12-30"), "12/30/2025");
});

test("Status messages", () => {
  assert.strictEqual(getStatusMessage("success"), "Ready!");
  assert.strictEqual(getStatusMessage("unknown"), "Unknown status");
});
