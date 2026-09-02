import assert from "node:assert/strict";
import test from "node:test";
import { applyDeterministicProposalClaimVerdict } from "./proposal-claim-deterministic";

test("changing commercial facts always require current candidate confirmation", () => {
  assert.equal(applyDeterministicProposalClaimVerdict(
    "The candidate is available from 1 October for €95 per hour.",
    "Available in 2024.",
    "supported",
  ), "confirmation_required");
});

test("support cannot survive without resolvable evidence", () => {
  assert.equal(applyDeterministicProposalClaimVerdict("Led the programme.", "", "supported"), "unsupported");
});

test("conflicting numbers and negation downgrade unsafe positive claims", () => {
  assert.equal(applyDeterministicProposalClaimVerdict(
    "The candidate independently led a team of 12.",
    "Supported a project lead working with a team of 8.",
    "partially_supported",
  ), "contradicted");
  assert.equal(applyDeterministicProposalClaimVerdict(
    "The candidate advised 24 managers in 2025.",
    "The candidate advised 18 managers in 2024.",
    "supported",
  ), "contradicted");
  assert.equal(applyDeterministicProposalClaimVerdict(
    "The candidate holds a valid emergency response certificate.",
    "The emergency response certificate expired in June 2025.",
    "supported",
  ), "contradicted");
});

test("explicit employer attribution conflicts cannot remain supported", () => {
  assert.equal(applyDeterministicProposalClaimVerdict(
    "At DeltaSoft the candidate built the React client portal.",
    "At NoordWeb the candidate built the React client portal.",
    "supported",
  ), "contradicted");
});
