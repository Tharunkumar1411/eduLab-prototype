/**
 * Course 1 — narration scripts.
 *
 * This file is pure data. The lesson UI imports a Narration here by key; the
 * audio file is a separate asset under `public/audio/narration/`. If a file is
 * missing or fails to load the lesson shows the text transcript instead.
 *
 * To add a narrated moment to a lesson:
 *   1. Add an entry here with a unique `id`, the on-screen `text`, and an
 *      optional `audioUrl` + `expression`.
 *   2. Drop the matching MP3 at `public/audio/narration/<file>.m4a`.
 *   3. In the lesson, import the key and pass it to <CharacterNarrator>.
 */

import type { Narration } from '../../components/character/narration/types.ts';

const AUDIO_BASE = '/audio/narration';

export const COURSE_1_NARRATIONS = {
  intro: {
    id: 'ms_c1.intro',
    text:
      "Hey! Let's help Sunny Bakery grow. The owner wants to open five new shops — but there's one problem: where will the money come from?",
    audioUrl: `${AUDIO_BASE}/ms-c1-intro.m4a`,
    expression: 'explaining',
    autoplay: true,
  },
  fundingDecision: {
    id: 'ms_c1.funding-decision',
    text:
      "Sunny Bakery has a few choices. It could borrow money, bring in investors, or grow gradually using its existing profits. Each option comes with different trade-offs.",
    audioUrl: `${AUDIO_BASE}/ms-c1-funding-decision.m4a`,
    expression: 'thinking',
    autoplay: true,
  },
  investors: {
    id: 'ms_c1.investors',
    text:
      "Bringing in investors can help a company raise money by offering ownership shares. Those investors become shareholders, and their investment carries risk.",
    audioUrl: `${AUDIO_BASE}/ms-c1-investors.m4a`,
    expression: 'explaining',
    autoplay: true,
  },
  secondaryMarket: {
    id: 'ms_c1.secondary-market',
    text:
      "Now imagine Sunny Bakery becomes publicly listed. One investor wants to sell some shares, while another wants to buy. A stock market helps facilitate trading between market participants.",
    audioUrl: `${AUDIO_BASE}/ms-c1-secondary-market.m4a`,
    expression: 'explaining',
    autoplay: true,
  },
  exploreIntro: {
    id: 'ms_c1.explore-intro',
    text:
      "There are four moving parts in a stock market story. Tap each one — company, investor, exchange and share — to see what it does.",
    audioUrl: `${AUDIO_BASE}/ms-c1-explore-intro.m4a`,
    expression: 'encouraging',
    autoplay: true,
  },
  knowledgeCheckIntro: {
    id: 'ms_c1.knowledge-check-intro',
    text:
      "Here's a new scenario. Pick what you think fits best — you can try again as many times as you need.",
    audioUrl: `${AUDIO_BASE}/ms-c1-check-intro.m4a`,
    expression: 'encouraging',
    autoplay: true,
  },
  feedbackIncorrect: {
    id: 'ms_c1.feedback-incorrect',
    text:
      "Not quite! Take another look at the choices. Think about what a company receives when it borrows money compared with what it offers when it issues shares.",
    audioUrl: `${AUDIO_BASE}/ms-c1-feedback-incorrect.m4a`,
    expression: 'encouraging',
    autoplay: true,
  },
  feedbackCorrect: {
    id: 'ms_c1.feedback-correct',
    text:
      "Exactly! You identified the key idea. Financial markets connect participants who want to raise capital, invest, or trade financial assets.",
    audioUrl: `${AUDIO_BASE}/ms-c1-feedback-correct.m4a`,
    expression: 'celebrating',
    autoplay: true,
  },
  completion: {
    id: 'ms_c1.completion',
    text:
      "That's the whole idea of a financial market. Companies raise capital, investors become part-owners, and an exchange matches people who want to trade. You're ready for Course 2.",
    audioUrl: `${AUDIO_BASE}/ms-c1-completion.m4a`,
    expression: 'celebrating',
    autoplay: true,
  },
} as const satisfies Record<string, Narration>;

export type Course1NarrationKey = keyof typeof COURSE_1_NARRATIONS;
