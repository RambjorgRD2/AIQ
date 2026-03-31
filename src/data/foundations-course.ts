export interface RecallQuestion {
  q: string;
  hint: string;
}

export interface Exercise {
  title: string;
  prompt: string;
  hint: string;
  tools: string[];
}

export interface Lesson {
  module: number;
  slug: string;
  tier: 1 | 2 | 3;
  tierLabel: string;
  title: string;
  subtitle: string;
  duration: string;
  hook: string;
  concept: string;        // HTML
  demoTitle: string;
  demo: string;           // HTML
  exercise: Exercise;
  recall: RecallQuestion[];
  reflection: string;
  keyTakeaway: string;
}

export const foundations: Lesson[] = [
  {
    module: 1,
    slug: 'what-ai-actually-is',
    tier: 1,
    tierLabel: 'Tier 1 — Orientation',
    title: 'What AI Actually Is',
    subtitle: "Demystify LLMs and replace the mental model that's making you worse at using AI.",
    duration: '12 min',
    hook: `Most people's mental model of AI is borrowed from science fiction — a sentient computer that thinks, reasons, and has goals. This model makes you worse at using AI. It leads to misplaced trust, frustrating failures, and approaches that don't work. In the next 12 minutes, you'll replace that borrowed model with one that's accurate, useful, and immediately changes how you work.`,

    concept: `
<p>Before we talk about what AI is, let's name what most people think it is. There are two dominant wrong models, and they each cause predictable problems.</p>

<div class="c-model-grid">
  <div class="c-model-card">
    <div class="c-model-card-label">❌ Wrong Model 1</div>
    <h3>The Oracle</h3>
    <p>You ask it a question. It knows the answer. It's essentially a smarter Google — a vast database of truth that retrieves the correct answer when prompted correctly.</p>
    <p class="c-model-problem"><strong>What this produces:</strong> You trust outputs without verifying. You get confused when AI is confidently wrong. You treat every response as fact.</p>
  </div>
  <div class="c-model-card">
    <div class="c-model-card-label">❌ Wrong Model 2</div>
    <h3>The Robot</h3>
    <p>It follows instructions mechanically, like sophisticated autocomplete. Very fast, very literal, executing commands without anything like intelligence.</p>
    <p class="c-model-problem"><strong>What this produces:</strong> You dramatically underuse AI's capabilities. You don't understand why careful prompting matters. You give up quickly when results disappoint.</p>
  </div>
</div>

<p class="c-insight-text">Both models produce systematic mistakes. The Oracle produces <strong>over-trust</strong>. The Robot produces <strong>under-use</strong>. The accurate model produces neither.</p>

<div class="c-section-break"></div>
<h2>What an LLM Actually Does</h2>

<p>A Large Language Model is, fundamentally, a <strong>prediction engine</strong>.</p>

<p>It was trained on a massive dataset of text — books, websites, code, conversations, articles — and learned one thing with extraordinary precision:</p>

<blockquote>Given this sequence of text, what word (technically, what "token") is most likely to come next?</blockquote>

<p>That's not a metaphor. That's the literal mechanism. Every word in every AI response is selected through a probabilistic process of predicting the most contextually appropriate continuation of what you wrote.</p>

<div class="c-callout">
  <div class="c-callout-icon">⚡</div>
  <div><p>What emerged from doing this at massive scale on virtually all of human-written language is something genuinely remarkable: a system that can reason through problems step by step, write code, translate languages, analyze documents, and explain concepts at multiple levels of complexity.</p>
  <p style="margin:0"><strong>But the mechanism is <em>prediction</em>, not understanding.</strong> This distinction has real consequences.</p></div>
</div>

<div class="c-section-break"></div>
<h2>The Alien Translator</h2>

<p>Here's the mental model that actually works: imagine an entity that has read essentially everything humans have ever written, but has never <em>experienced</em> anything.</p>

<p>It has never seen the color red, felt cold, made a decision with real stakes, or cared about an outcome. It has no preferences, no fear, no curiosity. What it has is an extraordinarily rich statistical model of how humans <em>write</em> about all of these things.</p>

<p>It doesn't know things the way a person knows things. It knows them the way a language knows them — as patterns in how things are expressed. This model predicts your actual experience with AI far better than either wrong model:</p>

<ul>
  <li><strong>Why it writes beautifully about grief without feeling it:</strong> pattern-matching on how grief is written about, not experiencing it</li>
  <li><strong>Why it hallucinates:</strong> when there's no strong pattern match for a specific fact, it generates something that <em>looks like</em> a correct answer — the shape of truth without the substance</li>
  <li><strong>Why prompting matters:</strong> you're feeding context to a prediction engine that generates the most plausible continuation of what you wrote</li>
  <li><strong>Why it's wrong with total confidence:</strong> confidence is a tone pattern, not a verification signal</li>
</ul>

<div class="c-section-break"></div>
<h2>What AI Is Good At — and Where It Fails</h2>

<p>Once you hold the right model, AI's capabilities and limitations become <strong>predictable</strong> rather than mysterious.</p>

<div class="c-two-col">
  <div class="c-two-col-good">
    <div class="c-two-col-header">✅ Reliably good</div>
    <ul>
      <li>Generating well-structured text on any topic</li>
      <li>Drafting, rewriting, summarizing, reformatting</li>
      <li>Explaining concepts at different complexity levels</li>
      <li>Writing code that follows common patterns</li>
      <li>Synthesizing multiple sources into a summary</li>
      <li>Generating options, variations, and alternatives</li>
      <li>Following complex multi-part instructions</li>
    </ul>
  </div>
  <div class="c-two-col-bad">
    <div class="c-two-col-header">⚠️ Verify before using</div>
    <ul>
      <li>Specific factual claims (events, statistics, citations)</li>
      <li>Precise mathematical calculation</li>
      <li>Information after the model's training cutoff</li>
      <li>Anything where being precisely right matters</li>
      <li>Genuinely original ideas (it generates novelty that <em>looks</em> original)</li>
      <li>Knowing what it doesn't know — rarely signals uncertainty accurately</li>
    </ul>
  </div>
</div>
`,

    demoTitle: 'Watch the prediction engine at work',
    demo: `
<p>The clearest demonstration: watch AI complete something that has no "right" answer.</p>

<div class="demo-step">
  <div class="demo-step-num">1</div>
  <div class="demo-step-body">
    <p class="demo-step-label">No context</p>
    <div class="demo-prompt">"The meeting had been going for two hours. Sarah put down her pen and"</div>
    <p>The AI completes this plausibly — "looked out the window," "exhaled slowly," "pushed back her chair." None is retrieved from a database. None is "correct." Each is a statistically plausible continuation drawn from patterns in millions of similar sentences.</p>
  </div>
</div>

<div class="demo-step">
  <div class="demo-step-num">2</div>
  <div class="demo-step-body">
    <p class="demo-step-label">Add emotional context</p>
    <div class="demo-prompt">"The meeting had been going for two hours and nothing had been decided. Sarah, who had driven four hours to be there, put down her pen and"</div>
    <p>The completions shift toward frustration, fatigue, or resignation — not because the AI understood the emotional stakes, but because text describing similar situations tends to continue in those directions.</p>
  </div>
</div>

<div class="c-callout">
  <div class="c-callout-icon">💡</div>
  <p style="margin:0">You are not asking questions and receiving answers. You are <strong>providing context and receiving plausible continuations</strong>. This reframing changes everything about how you use the tool.</p>
</div>
`,

    exercise: {
      title: 'Try the prediction engine yourself',
      prompt: `<p>Open any AI tool (Claude, ChatGPT, or Gemini) and try these two prompts. Notice what the AI produces and how it differs between them.</p>
<div class="ex-prompt-block"><div class="ex-prompt-label">Prompt 1</div><div class="demo-prompt">"The most important thing to understand about AI is"</div></div>
<div class="ex-prompt-block"><div class="ex-prompt-label">Prompt 2</div><div class="demo-prompt">"A skeptic who had just read three articles about AI hype might say: 'The most important thing to understand about AI is"</div></div>
<p>Compare the two completions. Did the AI "know" more in one case? Or did the context change what kind of completion was most statistically plausible?</p>
<p>Then try one more: give the AI an incomplete sentence from your own work or life. Does the completion feel "intelligent"? Or like a very sophisticated pattern match?</p>`,
      hint: 'There are no right or wrong answers here. You\'re building the mental model, not testing knowledge.',
      tools: ['Claude', 'ChatGPT', 'Gemini'],
    },

    recall: [
      {
        q: 'In your own words: what is a Large Language Model actually doing when it generates a response?',
        hint: 'Think about the mechanism, not the output. What is the process by which each word gets chosen?',
      },
      {
        q: 'Why does AI "hallucinate" — that is, state false information confidently? Use the mental model from this lesson to explain it.',
        hint: 'Think about what happens when the prediction engine encounters a specific fact it doesn\'t have a strong pattern match for.',
      },
      {
        q: 'Name two things AI is reliably good at and two things it is unreliable for. Why does the accurate mental model help predict which is which?',
        hint: 'Think about what a prediction engine trained on text would be strong at versus where precision and factual accuracy are required.',
      },
    ],

    reflection: `Before this lesson, what was your mental model of AI? Was it closer to the Oracle, the Robot, or something else? How does the "alien translator / prediction engine" model change how you'll use AI this week? Write 3-5 sentences — there's no right answer here, only what's honest for you.`,

    keyTakeaway: 'AI is a prediction engine trained on human text. It generates contextually plausible continuations, not retrieved facts. Confidence of tone is not a signal of accuracy. Understanding this changes everything about how you prompt, verify, and trust AI outputs.',
  },

  {
    module: 2,
    slug: 'how-language-models-think',
    tier: 1,
    tierLabel: 'Tier 1 — Orientation',
    title: 'How Language Models Think',
    subtitle: 'Understand tokens, context windows, temperature, and why AI says things it doesn\'t mean.',
    duration: '11 min',
    hook: `You don't need to understand the math to work effectively with AI. But you do need to understand the three mechanics that explain most of the weird things AI does — including why it forgets earlier parts of a conversation, why the same prompt can give wildly different results, and why AI sometimes "goes off the rails." Once you understand tokens, context windows, and temperature, most AI surprises stop being mysterious.`,

    concept: `
<h2>🔤 Tokens: The Unit of Thought</h2>

<p>AI doesn't read text the way you do. It breaks language into <strong>tokens</strong> — chunks roughly corresponding to words. Common words are usually one token. Rare or long words may be several. Punctuation is often its own token.</p>

<div class="c-callout">
  <div class="c-callout-icon">💡</div>
  <div>
    <p><strong>Why tokens matter in practice:</strong></p>
    <ul style="margin:0.5rem 0 0 1rem">
      <li>Context window limits (like "128K context") are in <strong>tokens</strong>, not words</li>
      <li>Every generated token is influenced by every previous token in the conversation</li>
      <li>Unusual words or names get split unexpectedly, making the model less reliable on them</li>
    </ul>
  </div>
</div>

<div class="c-section-break"></div>
<h2>🧠 The Context Window: Your AI's Working Memory</h2>

<p>An AI model only "knows" what's currently in its context window — your system prompt, the conversation history, and the current message. Think of it as <strong>working memory, not long-term memory</strong>.</p>

<blockquote>Each conversation with an AI is a fresh piece of paper. Everything on that paper is available to it. Anything not on that paper doesn't exist from the model's perspective.</blockquote>

<p>What this means in practice:</p>
<ul>
  <li>In very long conversations, earlier messages may be dropped as the context fills up</li>
  <li>The AI can't access previous conversations unless the platform stores and re-injects them</li>
  <li>To make AI "remember" something important, keep it in the current context</li>
  <li>Context windows are large (100K+ tokens for Claude and ChatGPT) — but not infinite</li>
</ul>

<div class="c-section-break"></div>
<h2>🎲 Temperature: Why the Same Prompt Gets Different Results</h2>

<p>AI doesn't always pick the single most probable next token — that would produce repetitive output. Instead, it <em>samples</em> from a probability distribution. <strong>Temperature</strong> controls how this sampling works:</p>

<div class="c-temp-scale">
  <div class="c-temp-item c-temp-low">
    <div class="c-temp-label">Low (0.0–0.3)</div>
    <div class="c-temp-desc">Picks highest-probability tokens. Consistent, predictable. Best for code and factual tasks.</div>
  </div>
  <div class="c-temp-item c-temp-mid">
    <div class="c-temp-label">Medium (0.5–0.7)</div>
    <div class="c-temp-desc">Balances likely and interesting. Most conversational AI defaults here.</div>
  </div>
  <div class="c-temp-item c-temp-high">
    <div class="c-temp-label">High (0.8–1.0+)</div>
    <div class="c-temp-desc">Wider range of tokens selected. More creative and varied — but more likely to go off track.</div>
  </div>
</div>

<p>Running the same prompt twice and getting different results isn't a bug. It's how sampling works. For creative tasks, variation is a feature. For consistency, ask explicitly or use platform settings.</p>

<div class="c-section-break"></div>
<h2>🌀 Why AI "Hallucinates"</h2>

<p>The model is always generating the most statistically plausible continuation of the text it's seen. When you ask about a specific fact, it doesn't retrieve it from a database — it generates a response that <em>looks like</em> a factual answer, in the style factual answers are written.</p>

<p>If the fact was well-represented in training data, the output is often accurate. If it was rare, obscure, or recent, the model still generates something that <em>looks</em> like a confident factual claim — because that's what confident factual claims look like in text.</p>

<div class="c-callout">
  <div class="c-callout-icon">⚠️</div>
  <p style="margin:0"><strong>The practical rule:</strong> Any specific claim — a date, a statistic, a quote, a citation — should be independently verified before you use it. Use AI for synthesis, structure, and generation. Use primary sources for facts.</p>
</div>
`,

    demoTitle: 'The context window in real life',
    demo: `
<p>Three experiments you can run right now to see tokens, context, and temperature in action:</p>

<div class="demo-step">
  <div class="demo-step-num">1</div>
  <div class="demo-step-body">
    <p class="demo-step-label">Test the context window</p>
    <p>Start a conversation with an AI. Tell it your name and one unusual fact about yourself. Have a normal 10-message conversation on a completely different topic. Then ask: <em>"What do you remember about me from the start of this conversation?"</em></p>
    <p>Notice whether it remembered, what it recalled accurately, and what it got wrong or fabricated.</p>
  </div>
</div>

<div class="demo-step">
  <div class="demo-step-num">2</div>
  <div class="demo-step-body">
    <p class="demo-step-label">Test temperature variation</p>
    <p>Ask the same creative prompt three times in fresh conversations: <em>"Write the opening sentence of a short story about someone discovering something unexpected."</em></p>
    <p>Compare the three sentences. They'll differ in structure, tone, and word choice — even though the instruction was identical. This is temperature in action.</p>
  </div>
</div>

<div class="c-callout">
  <div class="c-callout-icon">💡</div>
  <p style="margin:0">These aren't tests to catch AI doing something wrong. They're <strong>calibration exercises</strong> — building your intuition for how AI memory and variation actually work so you can design better prompts.</p>
</div>
`,

    exercise: {
      title: 'Test the boundaries of AI memory',
      prompt: `<p>This exercise has two parts — both are quick and revealing.</p>
<div class="ex-prompt-block"><div class="ex-prompt-label">Part 1 — Test the context window</div><p>Start a new conversation. Tell the AI your name and one unusual specific fact about yourself. Have a normal 10-message conversation on a completely different topic. Then ask: <em>"What do you remember about me from the start of this conversation?"</em></p><p>Notice whether it remembered, what it recalled accurately, and what it got wrong or invented.</p></div>
<div class="ex-prompt-block"><div class="ex-prompt-label">Part 2 — Test temperature</div><p>Ask the AI: <em>"Write the opening sentence of a short story about someone discovering something unexpected."</em> Run this exact prompt three times (start fresh each time). Compare the three results.</p><p>Are they similar? Different? What varies — word choices, structure, tone?</p></div>`,
      hint: 'The goal is to build intuition through experience, not to catch the AI doing something wrong.',
      tools: ['Claude', 'ChatGPT', 'Gemini'],
    },

    recall: [
      {
        q: 'What is a context window, and what happens to earlier parts of a conversation when the context window fills up?',
        hint: 'Think about working memory vs. long-term memory. What does the model actually have access to?',
      },
      {
        q: 'Why does the same prompt sometimes produce different results when you run it twice? What mechanism is responsible?',
        hint: 'Think about the sampling process and what "temperature" controls.',
      },
      {
        q: 'A colleague sends you an AI-generated research summary with five specific statistics cited. What should you do before using those statistics in a presentation, and why?',
        hint: 'Connect this to how AI generates factual-sounding content versus how it actually retrieves or verifies facts.',
      },
    ],

    reflection: `Think of a time AI surprised you — either with something impressively good or unexpectedly wrong. Now that you understand tokens, context windows, and temperature: can you explain what probably happened? How does having a mechanical explanation for AI behavior change how you relate to it?`,

    keyTakeaway: 'AI processes text in tokens, operates only within the current context window, and samples outputs probabilistically. There is no verification step — the model generates plausible-sounding text regardless of accuracy. Understanding these mechanics turns AI surprises into predictable patterns.',
  },

  {
    module: 3,
    slug: 'your-first-effective-prompts',
    tier: 1,
    tierLabel: 'Tier 1 — Orientation',
    title: 'Your First Effective Prompts',
    subtitle: 'Move from casual use to deliberate practice. The fundamentals of prompt structure.',
    duration: '13 min',
    hook: `Most people prompt AI the way they type a Google search — short, keyword-heavy, vague. This produces mediocre results and leads people to conclude that "AI isn't that useful." The problem isn't the AI. It's the input. Prompting is a skill, and like all skills, it has a learning curve. This lesson gives you the fundamentals: three changes to how you write prompts that will immediately produce better results.`,

    concept: `
<p>Remember the mental model from Lesson 1: you're not asking a question of a knowledgeable entity. You're providing context to a prediction engine. The quality of what you get back is a <strong>direct function</strong> of the quality and specificity of the context you provide.</p>

<p>When you type "write me a summary," the AI makes dozens of decisions on your behalf: How long? For what audience? Of what? In what tone? It will guess — often plausibly, often wrong for your specific needs. Give it those decisions upfront and you get something much closer to what you want on the first attempt.</p>

<div class="c-section-break"></div>
<h2>The Three Fundamentals</h2>

<div class="c-fundamental">
  <div class="c-fundamental-num">1</div>
  <div class="c-fundamental-body">
    <h3>Role — tell AI who it's being</h3>
    <p>Role specification implicitly imports a vast set of contextual assumptions — vocabulary, tone, framing, depth — that would take many sentences to specify individually.</p>
    <div class="c-compare">
      <div class="c-compare-weak"><span class="c-compare-label">❌ Weak</span>"Explain machine learning to me."</div>
      <div class="c-compare-strong"><span class="c-compare-label">✅ Strong</span>"You are a patient teacher explaining machine learning to a curious professional with no technical background. Use everyday analogies and avoid jargon."</div>
    </div>
  </div>
</div>

<div class="c-fundamental">
  <div class="c-fundamental-num">2</div>
  <div class="c-fundamental-body">
    <h3>Context — give it what it needs</h3>
    <p>AI cannot read your mind, your files, or your organizational context. The most common reason AI gives unhelpful responses is missing context. Before sending, ask: what does it need to know that it might not have?</p>
    <div class="c-compare">
      <div class="c-compare-weak"><span class="c-compare-label">❌ Weak</span>"Rewrite this email to be more professional."</div>
      <div class="c-compare-strong"><span class="c-compare-label">✅ Strong</span>"Rewrite this email to be more professional. The recipient is a new client we haven't met yet. I want to sound warm but authoritative. The current version feels too casual. Keep it under 150 words. [paste email]"</div>
    </div>
  </div>
</div>

<div class="c-fundamental">
  <div class="c-fundamental-num">3</div>
  <div class="c-fundamental-body">
    <h3>Format — specify what you want back</h3>
    <p>By default, AI responds in the format that seems most typical for your request type. You can and should specify what you actually need:</p>
    <ul>
      <li>"Give me three options" — prevents AI from committing to one approach</li>
      <li>"Use bullet points, not paragraphs" — for scannable reference material</li>
      <li>"Keep the total response under 200 words" — for tight constraints</li>
      <li>"Include a brief explanation of your reasoning" — for understanding, not just output</li>
    </ul>
  </div>
</div>

<div class="c-section-break"></div>
<h2>The Before/After Habit</h2>

<p>Before sending a prompt, run through this quick checklist:</p>
<ol>
  <li>Have I given it a <strong>role</strong> or at least a framing for who it should be?</li>
  <li>Have I provided all the <strong>context</strong> it needs to actually help me?</li>
  <li>Have I specified what I want the <strong>output</strong> to look like?</li>
</ol>

<p>You don't need all three every time. But running through it before sending will improve your first-attempt results significantly.</p>

<div class="c-callout">
  <div class="c-callout-icon">🔁</div>
  <p style="margin:0"><strong>Iteration is not failure.</strong> Expert AI users iterate — they send a first prompt, evaluate the output, and follow up: "Make it shorter," "Less formal," "Expand the third option." Multi-turn conversations are often more productive than trying to write the perfect single prompt. Think of it as a dialogue, not a command.</p>
</div>
`,

    demoTitle: 'Before and after: the same request, rewritten',
    demo: `
<p>The same request written at three levels of specificity. Notice how each version gives the prediction engine more to work with.</p>

<div class="demo-step">
  <div class="demo-step-num">1</div>
  <div class="demo-step-body">
    <p class="demo-step-label">Typical first attempt</p>
    <div class="demo-prompt">"Help me write a LinkedIn post."</div>
    <p>The AI has no idea what topic, tone, audience, or goal you have. It guesses all of these. The result will be usable at best, forgettable always.</p>
  </div>
</div>

<div class="demo-step">
  <div class="demo-step-num">2</div>
  <div class="demo-step-body">
    <p class="demo-step-label">With role and context</p>
    <div class="demo-prompt">"I'm a marketing manager who just completed a three-month AI implementation project at my company. Help me write a LinkedIn post about what we learned."</div>
    <p>Better. But still no format spec, no audience, and "what we learned" is vague. Reasonable output — probably too long and too generic.</p>
  </div>
</div>

<div class="demo-step">
  <div class="demo-step-num">3</div>
  <div class="demo-step-body">
    <p class="demo-step-label">With role, context, and format</p>
    <div class="demo-prompt">"I'm a marketing manager who just completed a three-month AI implementation project. The biggest lesson: the hardest part wasn't the technology — it was getting the team to change their workflows. Write a LinkedIn post that shares this insight for other managers going through the same thing. First-person narrative tone, start with a specific moment rather than a general statement, under 250 words."</div>
    <p>Now the AI has enough to produce something genuinely useful on the first attempt.</p>
  </div>
</div>
`,

    exercise: {
      title: 'Rewrite your weakest prompt',
      prompt: `<p>Think of a time you used AI and the result was disappointing — too generic, too long, wrong tone, missed the point. If nothing comes to mind, use one of the "weak" prompts from this lesson.</p>
<p>Take that prompt and rewrite it three times, adding one element each time:</p>
<div class="ex-prompt-block"><div class="ex-prompt-label">Rewrite 1 — Add a role</div><p>Start with: <em>"You are a [role]..."</em></p></div>
<div class="ex-prompt-block"><div class="ex-prompt-label">Rewrite 2 — Add context</div><p>Add: audience, constraints, background, what you've already tried.</p></div>
<div class="ex-prompt-block"><div class="ex-prompt-label">Rewrite 3 — Add a format spec</div><p>Add: length, structure, tone, output style.</p></div>
<p>Try all three versions in an actual AI tool. Which changed the result most — the role, the context, or the format spec?</p>`,
      hint: 'Don\'t try to write the perfect prompt on the first try. The goal is to notice what each element adds.',
      tools: ['Claude', 'ChatGPT', 'Gemini'],
    },

    recall: [
      {
        q: 'What are the three fundamental elements of a well-structured prompt? Give a brief description of what each one does.',
        hint: 'Role, context, format — and why each one reduces the number of decisions the AI has to guess at.',
      },
      {
        q: 'Write a before-and-after example of a prompt from your own work or life. What specific changes did you make, and why?',
        hint: 'Pick something real — a work email, a document you want help with, a question you\'d actually ask. Apply the three fundamentals.',
      },
      {
        q: 'Why is iteration a normal and expected part of good AI use, not a sign that something went wrong?',
        hint: 'Think about the nature of the prediction engine and the inherent limits of specifying exactly what you need in a single message.',
      },
    ],

    reflection: `Look back at your last three AI interactions. Without judging yourself, notice: did you provide a role? Did you give context? Did you specify the output format? What one habit, if you added it to every prompt, would most improve your results?`,

    keyTakeaway: 'Effective prompts give AI a role, provide necessary context, and specify the desired output format. You are not asking a question — you are providing context to a prediction engine. Iteration is normal. The goal is better first attempts, not perfect first attempts.',
  },

  {
    module: 4,
    slug: 'getting-reliable-outputs',
    tier: 2,
    tierLabel: 'Tier 2 — Basic Prompting',
    title: 'Getting Reliable Outputs',
    subtitle: 'Iteration, feedback loops, and knowing when to trust — or verify — AI output.',
    duration: '11 min',
    hook: `Getting one good response from AI is luck. Getting consistently good responses is skill. This lesson is about the difference: how to evaluate what you get, how to guide AI toward what you actually need, and how to build a personal standard for when AI output is ready to use versus when it needs more work.`,

    concept: `
<h2>Evaluating Output: The Three Questions</h2>

<p>Before you use any AI output, run it through three questions:</p>

<ol>
  <li><strong>Is this accurate?</strong> Are any factual claims here ones that I can verify — and have I? Specific dates, statistics, citations, quotes, and names are all hallucination risk areas. Treat them as claims to check, not facts to trust.</li>
  <li><strong>Is this useful?</strong> Does this actually answer what I needed? Or did AI answer a slightly different question than the one I asked? Did it miss the context I provided?</li>
  <li><strong>Is this mine?</strong> Can I own this output? Does the voice sound right? Would anyone who knows my work recognize this as coming from me? For client-facing, public, or professional work — if it doesn't sound like you, it isn't done yet.</li>
</ol>

<h2>The Follow-Up Prompt: Your Most Important Tool</h2>

<p>The most underused capability in AI tools is the follow-up prompt. Most people treat AI interactions as transactional: one message, one response, done. But multi-turn conversations often produce dramatically better results than trying to nail the perfect single prompt.</p>

<p>Effective follow-up prompt patterns:</p>
<ul>
  <li><strong>Redirect:</strong> "That's too formal — make it sound like how I'd actually talk to a colleague."</li>
  <li><strong>Expand:</strong> "The third point is the most important one. Expand that section and reduce the others."</li>
  <li><strong>Constrain:</strong> "Cut this by half, prioritizing the most actionable information."</li>
  <li><strong>Challenge:</strong> "Play devil's advocate — what are the strongest objections to this approach?"</li>
  <li><strong>Reframe:</strong> "Rewrite this for someone who is skeptical about AI rather than enthusiastic about it."</li>
</ul>

<h2>Building Your Verification Habit</h2>

<p>The goal isn't to verify everything — that would defeat the purpose of using AI. The goal is to have a calibrated sense of what needs checking and what can be trusted.</p>

<p><strong>Generally safe to use without deep verification:</strong> structural suggestions, draft text that you'll edit anyway, brainstormed options, explanations of concepts you can sanity-check against your existing knowledge.</p>

<p><strong>Always verify before using:</strong> specific dates, statistics, citations, quotes attributed to real people, legal or medical claims, information about specific individuals, anything you'll stake your reputation on.</p>
`,

    demoTitle: 'Iteration in action',
    demo: `
<p>Watch how a response improves through directed iteration. The initial output is fine. Each follow-up makes it more useful.</p>
<p>Starting prompt: "Give me an introduction for a presentation on AI at work."</p>
<p>Follow-up 1: "The audience is skeptical about AI, not enthusiastic. Rewrite the opening with that in mind."</p>
<p>Follow-up 2: "Start with a specific story or scenario rather than a general statement."</p>
<p>Follow-up 3: "Now make it 30% shorter while keeping the core insight."</p>
<p>The fourth version is genuinely better than the first — not because the initial prompt was bad, but because iteration is how good outputs are built.</p>
`,

    exercise: {
      title: 'Build something through iteration',
      prompt: `Choose a real task — a message you need to send, a document you need to write, a problem you're working on.

Start with a basic prompt. Get the first response. Then do at least three follow-up prompts, each one steering the output closer to what you actually need.

After your fourth or fifth message: is the output genuinely better than what the first response gave you? What type of follow-up prompt made the biggest difference?`,
      hint: 'The best follow-up prompts are specific. "Make it better" is weak. "Make it shorter and cut the third paragraph" is strong.',
      tools: ['Claude', 'ChatGPT', 'Gemini'],
    },

    recall: [
      {
        q: 'What are the three questions to ask when evaluating any AI output before using it?',
        hint: 'Accuracy, usefulness, ownership — what does each one check?',
      },
      {
        q: 'What types of AI output generally need independent verification before use? What types are generally safe to use as-is?',
        hint: 'Think about the hallucination risk and what you\'re staking your credibility on.',
      },
    ],

    reflection: `Think about the last time you used an AI output without editing it. In hindsight, was that the right call? What would you apply from this lesson to that situation?`,

    keyTakeaway: 'Evaluate AI output for accuracy, usefulness, and voice before using it. Multi-turn iteration consistently produces better results than single perfect prompts. Know what to verify — and actually verify it.',
  },

  {
    module: 5,
    slug: 'ai-tools-landscape',
    tier: 2,
    tierLabel: 'Tier 2 — Basic Prompting',
    title: 'AI Tools Landscape',
    subtitle: 'ChatGPT, Claude, Gemini, Copilot — what each is good for and how to choose.',
    duration: '10 min',
    hook: `The AI tools landscape changes fast. But the principles for choosing the right tool for a given task change much more slowly. This lesson gives you a framework for evaluating AI tools — now and as new ones emerge — plus an honest look at where today's leading tools have different strengths.`,

    concept: `
<h2>The Four Categories of AI Tools</h2>

<p>Most AI tools you'll encounter fall into four categories, each suited to different types of tasks:</p>

<h3>1. General-Purpose Chat (Claude, ChatGPT, Gemini)</h3>
<p>Conversational interfaces for writing, analysis, explanation, brainstorming, and research synthesis. These are the Swiss Army knives of AI — not always best-in-class for specific tasks, but remarkably capable across a huge range of uses.</p>
<p><strong>Use when:</strong> you need to think through a problem, generate text, analyze a document, explain a concept, or aren't sure which specialized tool fits.</p>

<h3>2. Code-Augmented AI (GitHub Copilot, Cursor, Replit)</h3>
<p>AI integrated into development environments, with context awareness of your specific codebase. Better than general chat for coding tasks because they can see your actual files, error messages, and project structure.</p>
<p><strong>Use when:</strong> you're writing, debugging, or refactoring code in an active project.</p>

<h3>3. Search-Augmented AI (Perplexity, Bing Copilot, Google AI Overviews)</h3>
<p>AI that can retrieve current information from the web and cite sources. Reduces hallucination risk for factual queries because it can access real-time data. Still not a substitute for reading primary sources on important decisions.</p>
<p><strong>Use when:</strong> you need current information, research synthesis with citations, or factual queries where training data cutoffs matter.</p>

<h3>4. Workflow-Integrated AI (Microsoft Copilot for M365, Notion AI, Slack AI)</h3>
<p>AI built into the tools you already use, with access to your organizational data — emails, documents, meetings. Context-rich because it knows your actual work, not just general knowledge.</p>
<p><strong>Use when:</strong> you're working inside those platforms and need AI that has context on your specific work.</p>

<h2>Choosing Between General-Purpose Tools</h2>

<p>For the three leading general-purpose tools as of early 2026:</p>

<p><strong>Claude (Anthropic):</strong> Particularly strong at following nuanced instructions, long-document analysis, writing with a specific voice, and careful reasoning through complex problems. Tends toward being thorough and honest about uncertainty. Good default for writing, analysis, and anything where you need careful reasoning.</p>

<p><strong>ChatGPT (OpenAI):</strong> Largest ecosystem of plugins and integrations. Strong code generation, image generation (with DALL-E), and broad general capability. Wide range of specialized GPTs for specific use cases. Good default when you need tool integrations or specialized functionality.</p>

<p><strong>Gemini (Google):</strong> Best integration with Google Workspace (Docs, Gmail, Drive). Strong multimodal capability (images, audio, video). Native access to Google Search grounding. Good default if you live in Google's ecosystem.</p>

<p><strong>Practical advice:</strong> Don't over-optimize your tool choice. The difference between using the "best" tool and using any of these three well is much smaller than the difference between prompting poorly and prompting effectively. Develop skill with one tool before shopping for another.</p>

<h2>The Evaluation Framework for New Tools</h2>

<p>New AI tools launch constantly. When evaluating a new one, ask:</p>
<ul>
  <li>What specific problem does this solve better than general-purpose AI?</li>
  <li>What data does it have access to that general AI doesn't?</li>
  <li>What's the privacy and security model for data I put into it?</li>
  <li>Is the improvement worth the switching cost and learning curve?</li>
</ul>
`,

    demoTitle: 'Side-by-side: the same prompt in different tools',
    demo: `
<p>One valuable experiment: run the same prompt in two different tools and compare the responses. The differences will often reveal the different strengths, defaults, and tendencies of each model.</p>

<p>Try: "Summarize the main arguments for and against using AI for hiring decisions. Be balanced." Compare the depth, the caveats, the tone, and what each model emphasizes or omits.</p>
`,

    exercise: {
      title: 'Map your use cases to tools',
      prompt: `List the three most common tasks you currently use AI for (or would like to use AI for). For each one, think through:

1. Which tool category does this task fall into?
2. Which specific tool might be best suited to it?
3. Is there a privacy or data consideration that affects which tool you should use?

Then: try the task in the tool you identified. Was the fit as good as you expected?`,
      hint: 'If you work with sensitive data, the privacy question is not optional — it\'s the first question.',
      tools: ['Claude', 'ChatGPT', 'Gemini', 'Perplexity'],
    },

    recall: [
      {
        q: 'What are the four categories of AI tools, and what distinguishes each from the others?',
        hint: 'Think about what each has access to that the others don\'t.',
      },
      {
        q: 'When would you choose a search-augmented AI tool over a general-purpose chat tool?',
        hint: 'Think about when accuracy of current facts matters versus when generation quality matters.',
      },
    ],

    reflection: `Which tool or category of AI tools are you currently underusing? Based on this lesson, what would you try differently this week?`,

    keyTakeaway: 'Match the tool to the task. General-purpose chat for writing and analysis. Code-augmented for development. Search-augmented for current facts. Workflow-integrated for organizational context. Skill with any tool beats using the "right" tool poorly.',
  },

  {
    module: 6,
    slug: 'ai-for-writing-and-communication',
    tier: 2,
    tierLabel: 'Tier 2 — Basic Prompting',
    title: 'AI for Writing & Communication',
    subtitle: 'Make AI your thinking partner, not just a text generator.',
    duration: '12 min',
    hook: `Writing with AI isn't about replacing your voice — it's about removing the friction between your ideas and the page. Most people use AI as a typist: tell it what to write, paste the result. The better use is as a thinking partner: someone to push back on your ideas, help you find what you're actually trying to say, and give you a first draft that you can make your own. This lesson is about the difference.`,

    concept: `
<h2>The Drafting Trap</h2>

<p>The most common writing mistake with AI: asking it to write something fully formed before you've thought through what you actually want to say. AI is excellent at producing text that looks finished. That polished surface hides a problem: you haven't actually done the thinking.</p>

<p>The output sounds authoritative. It's well-structured. It might even be accurate. But it's not your thought — it's AI's best guess at what someone in your position might write. The thinking that should have happened in the drafting process never happened.</p>

<p>The better pattern is to use AI in the thinking phase, not just the writing phase.</p>

<h2>AI as Thinking Partner</h2>

<p>Some of the highest-value writing uses of AI don't produce a single word of your final document:</p>

<ul>
  <li><strong>"What am I actually trying to say here?"</strong> — Paste your rough notes or half-formed thoughts and ask AI to identify what the core argument or point seems to be. Then decide if that's right.</li>
  <li><strong>"What are the strongest objections to this?"</strong> — Ask AI to steelman the opposition to your argument. The pushback often clarifies your position.</li>
  <li><strong>"What's missing?"</strong> — Share your outline or draft and ask what questions a skeptical reader might have that you haven't answered.</li>
  <li><strong>"What order makes sense?"</strong> — Dump your bullet points and ask AI to suggest three different ways to sequence the argument. Seeing different structures often reveals the right one.</li>
</ul>

<h2>The Voice Problem (and How to Solve It)</h2>

<p>AI-generated text sounds like AI-generated text. The vocabulary is slightly too formal. The transitions are too smooth. The qualifications are too balanced. It reads like a competent committee wrote it rather than a specific person.</p>

<p>How to get AI to write in your voice instead:</p>

<ol>
  <li><strong>Give it samples.</strong> Paste two or three examples of your own writing and say: "Match the tone and style of these examples."</li>
  <li><strong>Give it adjectives.</strong> "Write this in a voice that is direct, conversational, and slightly irreverent. Not formal, not cautious."</li>
  <li><strong>Edit aggressively.</strong> AI's first draft is your raw material, not your output. The edit is where your voice enters.</li>
</ol>

<h2>High-Value Writing Tasks by Category</h2>

<p><strong>Emails and messages:</strong> Draft → ask AI to make it clearer and more direct → edit back to your voice. Particularly valuable for difficult conversations — AI removes the emotional charge that makes hard messages harder to write.</p>

<p><strong>Long-form writing:</strong> AI for outline and structure. You for the substance. AI for language cleanup after you've said what you mean.</p>

<p><strong>Summaries:</strong> Strong AI use case. Paste the original, ask for a summary calibrated to your audience and purpose. Still verify key facts.</p>

<p><strong>First responses in new situations:</strong> When you're writing something you've never written before — a new type of email, a genre you're not confident in — AI's draft gives you a template to react to, which is faster than starting cold.</p>
`,

    demoTitle: 'The thinking partner in practice',
    demo: `
<p>Here's an example of using AI for the thinking phase of a document, not just the writing phase:</p>

<p><strong>Prompt:</strong> "I need to write an email asking my team to adopt a new workflow tool that nobody asked for and that will add work in the short term before it saves time. Here are my rough notes: [paste rough notes]. What is the core argument I'm actually making? What are the three most likely objections? And what am I missing that would make this more persuasive?"</p>

<p>This prompt doesn't produce an email — it produces the thinking you need to write a good email. The email you write after this conversation will be far stronger than anything AI would have drafted without it.</p>
`,

    exercise: {
      title: 'Use AI for the thinking, not just the writing',
      prompt: `Choose something you need to write this week — an email, a document, a presentation, a message.

Before asking AI to write anything, ask it to help you think:
1. Share your rough notes or initial thoughts and ask: "What is the core point I seem to be making? What questions does a reader still have?"
2. Ask: "What are the strongest objections to this approach?"
3. Ask: "What's the most important thing I should say first?"

Then write your own draft based on those answers. You can use AI for editing passes afterward — but write the substance yourself.

Compare the result to how you'd normally write something with AI. Which approach produced writing you're more confident about?`,
      hint: 'This is a longer exercise. The point is to notice what happens to the quality of your thinking when you don\'t outsource it.',
      tools: ['Claude', 'ChatGPT', 'Gemini'],
    },

    recall: [
      {
        q: 'What is "the drafting trap" in AI-assisted writing, and why does it matter?',
        hint: 'Think about what happens to the thinking process when AI writes before you\'ve done the thinking.',
      },
      {
        q: 'Name three ways to use AI in the thinking phase of writing, before generating any draft text.',
        hint: 'Consider how AI can help with argument structure, objections, and sequence.',
      },
    ],

    reflection: `Which types of writing in your work could benefit most from AI as a thinking partner rather than a text generator? What would you need to change about how you currently use AI for writing?`,

    keyTakeaway: 'The highest-value AI writing use isn\'t drafting — it\'s thinking. Use AI to stress-test your argument, identify gaps, and find the right structure before you write. Edit aggressively to restore your voice. The thinking is yours; AI handles the friction.',
  },

  {
    module: 7,
    slug: 'ai-for-research-and-analysis',
    tier: 2,
    tierLabel: 'Tier 2 — Basic Prompting',
    title: 'AI for Research & Analysis',
    subtitle: 'Surface insights fast. Know the difference between AI-assisted and AI-generated research.',
    duration: '11 min',
    hook: `AI can surface insights that would take hours to find manually. It can synthesize large documents, identify patterns across multiple sources, and generate frameworks for thinking about complex problems. It is not, however, a research database. Understanding the difference — and knowing which uses are high-value versus high-risk — will make you dramatically more effective at research tasks while keeping you out of trouble.`,

    concept: `
<h2>What AI Can and Cannot Do for Research</h2>

<p><strong>High-value AI research uses:</strong></p>
<ul>
  <li>Synthesizing documents you provide — paste a 50-page report and ask for the key findings</li>
  <li>Explaining complex topics at the right level — "explain GDPR implications as if to a non-legal business manager"</li>
  <li>Generating frameworks — "what are the main dimensions I should evaluate when assessing a new vendor?"</li>
  <li>Identifying gaps in your research — "given what I've shared, what questions am I not asking that I should be?"</li>
  <li>Comparing perspectives — "summarize the main arguments for and against [position]"</li>
  <li>Finding connections — "what do these three trends have in common that isn't immediately obvious?"</li>
</ul>

<p><strong>High-risk AI research uses (verify everything):</strong></p>
<ul>
  <li>Asking for specific statistics, dates, or data points — these are prime hallucination territory</li>
  <li>Asking for citations — AI will generate plausible-looking citations that often don't exist or are slightly wrong</li>
  <li>Asking about recent events — the model's training cutoff means anything recent is unreliable</li>
  <li>Asking for specific claims about real people or organizations</li>
</ul>

<h2>The Document Analysis Workflow</h2>

<p>One of the most practical and reliable AI research uses: document analysis. The pattern is simple — you provide the source material, AI analyzes it. You've eliminated hallucination risk for any claim directly derived from the document.</p>

<p>High-value document analysis prompts:</p>
<ul>
  <li>"What are the three most important findings in this document, stated as actionable insights?"</li>
  <li>"What assumptions does this document make that are never explicitly stated?"</li>
  <li>"Summarize this for an executive who has five minutes and needs to know whether to approve this project."</li>
  <li>"What questions does this document raise that it doesn't answer?"</li>
  <li>"Compare these two documents: where do they agree, and where do they contradict each other?"</li>
</ul>

<h2>The Critical Evaluation Habit</h2>

<p>Good researchers apply critical evaluation to everything they read. AI-generated research summaries require the same treatment — and in some ways more, because AI presents everything with the same confident prose style regardless of how certain or uncertain the underlying claim is.</p>

<p>When reviewing AI research output, ask:</p>
<ul>
  <li>What is the source of each specific claim? Is it from a document I provided, or from training data?</li>
  <li>Are any statistics or citations here worth verifying against primary sources?</li>
  <li>What perspective is this analysis missing? What has AI not included?</li>
  <li>Does this synthesis represent the full picture, or did AI over-index on certain sources or framings?</li>
</ul>
`,

    demoTitle: 'Document analysis in practice',
    demo: `
<p>The most reliable research workflow: bring your own documents.</p>

<p>If you have a long report to analyze, paste the full text (or use a tool that supports file upload) and try this sequence:</p>

<ol>
  <li>"Give me a 3-sentence executive summary of this document."</li>
  <li>"What is the document's central argument or recommendation?"</li>
  <li>"What evidence does it provide for that argument? How strong is the evidence?"</li>
  <li>"What is this document missing or assuming that isn't justified by the evidence?"</li>
</ol>

<p>This sequence moves from summary → argument → evidence → critique. By the end, you understand the document better than most people who read it fully — and you have critical questions to dig into.</p>
`,

    exercise: {
      title: 'Analyze a document with structured prompts',
      prompt: `Find a document you need to understand for your work — a report, a long email thread, a policy document, an article. Paste it into an AI tool (or use the file upload if available) and run through this analysis sequence:

1. Executive summary (3 sentences)
2. Main argument or recommendation
3. Key evidence cited
4. What's missing or assumed
5. Your top two follow-up questions

After the AI gives you its analysis: do you agree? What did it get right? What did it miss? What would you add?`,
      hint: 'The last step — your own evaluation of AI\'s analysis — is the most important. This is where you develop critical judgment about AI-generated research.',
      tools: ['Claude', 'ChatGPT', 'Gemini'],
    },

    recall: [
      {
        q: 'What is the key difference in reliability between "analyzing documents you provide" and "asking AI for research facts"?',
        hint: 'Think about where the information comes from and what the hallucination risk is in each case.',
      },
      {
        q: 'Name three types of AI research outputs that should always be verified against primary sources before use.',
        hint: 'Think about what AI consistently gets wrong: statistics, citations, recent events...',
      },
    ],

    reflection: `Where do you currently do the most research in your work? Which parts of that research process would be genuinely faster and better with AI assistance? Which parts would you be more careful about?`,

    keyTakeaway: 'AI is powerful for synthesis, framework generation, and document analysis — especially when you provide the source material. It is unreliable for specific facts, citations, and recent events. Bring your own documents and verify any specific claims before using them.',
  },

  {
    module: 8,
    slug: 'prompt-patterns-that-work',
    tier: 2,
    tierLabel: 'Tier 2 — Basic Prompting',
    title: 'Prompt Patterns That Work',
    subtitle: 'The 5 most reliable prompt structures and when to use each one.',
    duration: '13 min',
    hook: `Good prompting isn't about having a long list of tricks. It's about having a small set of reliable patterns that you apply to the right situation. This lesson covers five prompt structures that work across a wide range of contexts — each one addresses a different type of task, and knowing which to reach for turns prompting from a guess into a practice.`,

    concept: `
<h2>Pattern 1: The Role + Task + Format (RTF) Prompt</h2>
<p>The workhorse pattern. For any task where you need AI to produce something specific.</p>
<p><strong>Structure:</strong> "You are [role]. [Task with context]. [Output format specification]."</p>
<p><strong>Example:</strong> "You are an experienced HR manager. I need to write a performance review for a team member who is technically strong but struggles with communication. Draft a review that is honest, specific, and constructive — not harsh, not vague. Use bullet points for strengths and areas for growth, then a paragraph of overall assessment. Keep it under 400 words."</p>
<p><strong>Best for:</strong> Documents, emails, summaries, analyses — anything with a specific output you need.</p>

<h2>Pattern 2: The Thinking-Out-Loud Prompt (Chain of Thought)</h2>
<p>For complex problems where you need AI to work through its reasoning, not just give you an answer.</p>
<p><strong>Structure:</strong> "[Problem]. Before giving me your answer, think through this step by step. Show your reasoning."</p>
<p><strong>Example:</strong> "I'm trying to decide whether to hire a contractor or a full-time employee for a 6-month project. Before giving me a recommendation, think through this step by step — consider the cost comparison, the skill requirements, the long-term implications, and the management overhead. Then give me your recommendation."</p>
<p><strong>Best for:</strong> Decisions, analyses, problem-solving, anything where the reasoning matters as much as the conclusion.</p>

<h2>Pattern 3: The Examples Prompt (Few-Shot)</h2>
<p>When the output format or style is hard to describe but easy to demonstrate.</p>
<p><strong>Structure:</strong> "Here are [N] examples of [what I want]. Now generate [new thing] in the same style."</p>
<p><strong>Example:</strong> "Here are three subject lines from our most successful email campaigns: [example 1], [example 2], [example 3]. Generate 10 subject lines for our upcoming webinar on AI adoption, matching the tone and style of these examples."</p>
<p><strong>Best for:</strong> Brand voice, specific stylistic requirements, consistent formatting, anything where showing is easier than telling.</p>

<h2>Pattern 4: The Constraints Prompt</h2>
<p>For when the limitations are as important as the task. Constraints focus AI output dramatically.</p>
<p><strong>Structure:</strong> "[Task]. Constraints: [list of what you must/cannot do]."</p>
<p><strong>Example:</strong> "Write a product description for our new workflow tool. Constraints: maximum 100 words, no technical jargon, do not use the words 'revolutionary' or 'game-changing', must include a specific use case, must end with a single clear action."</p>
<p><strong>Best for:</strong> Marketing copy, social media, anything with specific requirements that AI tends to violate by default.</p>

<h2>Pattern 5: The Critic Prompt</h2>
<p>For improving your own work. Give AI something you've written and ask it to be a rigorous, specific editor.</p>
<p><strong>Structure:</strong> "Here is [my work]. Act as a rigorous [editor/critic/reviewer]. Identify [specific types of issues]. Be direct and specific — don't soften your feedback."</p>
<p><strong>Example:</strong> "Here is my executive presentation draft. Act as a rigorous executive who has seen 200 such presentations. Identify: where the argument is unclear, where I'm making claims without support, where I'm being too vague, and where the slide order doesn't follow. Be direct — I can handle honest feedback."</p>
<p><strong>Best for:</strong> Improving your own writing, presentations, proposals, code, arguments.</p>
`,

    demoTitle: 'Matching patterns to problems',
    demo: `
<p>The same task, approached with different patterns, produces different types of useful outputs:</p>

<p><strong>Task:</strong> "I need to communicate a new remote work policy to my team."</p>

<ul>
  <li><strong>RTF:</strong> Get a well-structured email in the right tone and format</li>
  <li><strong>Thinking-out-loud:</strong> Get the reasoning about what to prioritize, what concerns to address, what order makes sense</li>
  <li><strong>Critic:</strong> Paste your draft and get specific feedback on what's unclear or likely to cause concerns</li>
  <li><strong>Constraints:</strong> Specify that it must be under 300 words, must address the top 3 concerns, must end with a clear ask</li>
</ul>

<p>None of these is better than the others — they're useful at different stages of the same task.</p>
`,

    exercise: {
      title: 'Apply all five patterns to one task',
      prompt: `Choose one real task from your work — something you actually need to produce. Apply all five patterns to it, one at a time:

1. RTF Prompt — get a first draft
2. Thinking-Out-Loud — ask AI to reason through the key decisions
3. Critic Prompt — paste your draft (or AI's draft) and ask for specific critique
4. Constraints Prompt — add 3 specific constraints you care about
5. Examples Prompt — give AI one or two examples of similar things done well

By the end, you should have something genuinely useful and a clear sense of which patterns added the most value for this type of task.`,
      hint: 'You don\'t have to use all five patterns in sequence every time. This exercise is about learning what each one produces so you can choose the right one instinctively.',
      tools: ['Claude', 'ChatGPT', 'Gemini'],
    },

    recall: [
      {
        q: 'Describe the five prompt patterns from this lesson and give one use case where each is the best choice.',
        hint: 'RTF, Chain of Thought, Few-Shot, Constraints, Critic — what does each one produce that the others don\'t?',
      },
      {
        q: 'A colleague is trying to get AI to write in their company\'s specific brand voice and keeps getting generic results. Which prompt pattern would you recommend, and why?',
        hint: 'Think about which pattern is best when showing is easier than describing.',
      },
    ],

    reflection: `Which of the five patterns are you already using (even without having named it)? Which one are you least likely to have tried? What would you use that missing pattern for this week?`,

    keyTakeaway: 'Five reliable patterns cover most prompting needs: RTF for structured outputs, Chain of Thought for reasoning, Few-Shot for style matching, Constraints for focused output, Critic for improvement. Match the pattern to the problem.',
  },

  {
    module: 9,
    slug: 'working-with-ai-daily',
    tier: 3,
    tierLabel: 'Tier 3 — Understanding Limits',
    title: 'Working with AI Daily',
    subtitle: 'Build a sustainable AI habit. Routines, workflows, and avoiding dependency traps.',
    duration: '10 min',
    hook: `Most people's AI use is reactive — they remember it exists when they're stuck on something, then go weeks without using it. The people who get the most value from AI have the opposite pattern: consistent, deliberate integration into daily work. But there's a real risk on the other side: over-reliance that erodes the skills and judgment AI is supposed to augment. This lesson is about finding the sustainable middle.`,

    concept: `
<h2>The Consistency Problem</h2>

<p>AI skill is perishable. The gap between someone who uses AI daily and someone who uses it once a week isn't just efficiency — it's quality of judgment. Frequent users build intuition for when AI is likely to be wrong, what prompts produce reliable outputs for their specific use cases, and how to integrate AI naturally into their workflow rather than interrupting it.</p>

<p>Building a sustainable AI habit means making it the default for specific types of tasks, not a special-occasion tool.</p>

<h2>Where to Start: Low-Risk, High-Frequency Use Cases</h2>

<p>The best daily AI habits start with low-stakes, high-frequency tasks where failure doesn't matter much. These build skill without risk:</p>
<ul>
  <li>First drafts of routine emails and messages</li>
  <li>Summarizing long documents before meetings</li>
  <li>Brainstorming options before making decisions</li>
  <li>Explaining concepts you want to understand better</li>
  <li>Checking your logic or argument structure</li>
</ul>

<p>These are tasks you'd do anyway. AI makes them faster. The low stakes mean you can experiment with prompts, learn from failures, and build fluency without pressure.</p>

<h2>The Dependency Trap</h2>

<p>The risk of heavy AI use isn't that AI will replace your thinking — it's that you'll stop doing the thinking that builds skills and judgment over time.</p>

<p>Three dependency traps to watch for:</p>
<ul>
  <li><strong>The writing trap:</strong> Always having AI draft before you write anything yourself. Writing is thinking. If you never write without AI, you don't develop the thinking that writing builds.</li>
  <li><strong>The decision trap:</strong> Asking AI what you should do rather than using it to think through what you've already reasoned. AI input on decisions can be valuable; outsourcing the decision is not.</li>
  <li><strong>The search trap:</strong> Using AI for factual queries that used to require primary source research, then acting on the results without verifying. This is how AI errors become your errors.</li>
</ul>

<h2>A Useful Framework: AI for Augmentation, Not Replacement</h2>

<p>The question to ask about any AI use: is AI augmenting my capability here, or replacing it?</p>

<p>Augmentation: AI handles the friction (blank page, tedious reformatting, information synthesis) while you contribute judgment, voice, and context.</p>

<p>Replacement: AI produces the output; you approve it. Your judgment and expertise aren't engaged.</p>

<p>Augmentation builds skill over time. Replacement atrophies it. Both feel productive in the short term. Only one of them leaves you more capable next year.</p>
`,

    demoTitle: 'A sample daily AI workflow',
    demo: `
<p>Here's what a light but consistent daily AI integration might look like:</p>

<ul>
  <li><strong>Morning:</strong> Paste today's meeting agenda and ask "what questions should I be prepared to answer? What preparation would make me most valuable in each of these meetings?"</li>
  <li><strong>Before drafting emails:</strong> Ask AI to suggest the key points a response should address, then draft the email yourself</li>
  <li><strong>After reading something long:</strong> Paste it and ask "what are the three things I should remember from this?"</li>
  <li><strong>End of day:</strong> Share what you worked on and ask "what did I miss? What should I address tomorrow that I may have overlooked?"</li>
</ul>

<p>None of these replaces your judgment. All of them make your thinking sharper.</p>
`,

    exercise: {
      title: 'Design your own AI daily routine',
      prompt: `Think about your typical workday. Identify three recurring tasks where AI could consistently add value — not once in a while, but every day or every week.

For each task:
1. What is the task?
2. What prompt pattern would you use?
3. What would "good output" look like for this task?
4. What part of the task would you still do yourself, even with AI help?

Then: commit to trying this routine for one week. At the end of the week, what changed? What worked? What didn't?`,
      hint: 'The best daily habits are ones you\'d do even when not in the mood. Choose tasks that are high-frequency and low-risk so the habit can form without pressure.',
      tools: ['Claude', 'ChatGPT', 'Gemini'],
    },

    recall: [
      {
        q: 'What is the "dependency trap" in daily AI use? Give two examples of using AI in a way that could erode rather than build your skills.',
        hint: 'Think about the difference between augmenting your capability and replacing your judgment.',
      },
      {
        q: 'What is the difference between AI augmentation and AI replacement? Why does the distinction matter for long-term skill development?',
        hint: 'Think about what happens to your capabilities over a year of each pattern.',
      },
    ],

    reflection: `On a scale of 1-10, how consistently do you currently use AI in your work? What's the biggest barrier — habit, trust, knowing when to use it, or something else? What one change to your daily routine would increase your AI fluency the most over the next month?`,

    keyTakeaway: 'Consistent, deliberate AI use builds judgment that reactive use doesn\'t. Start with low-stakes, high-frequency tasks. Watch for the dependency trap: AI should augment your thinking, not replace it. The best AI habits leave you more capable, not less.',
  },

  {
    module: 10,
    slug: 'understanding-ai-limitations',
    tier: 3,
    tierLabel: 'Tier 3 — Understanding Limits',
    title: 'Understanding AI Limitations',
    subtitle: 'Bias, errors, training data cutoffs. Know what AI can\'t do before you rely on it.',
    duration: '12 min',
    hook: `The most dangerous AI user is not the skeptic who refuses to use it — it's the enthusiast who uses it without understanding where it fails. Knowing AI's limitations isn't pessimism; it's calibration. This lesson covers the four categories of AI limitation that matter most for everyday use, and how to work around each one without abandoning the value.`,

    concept: `
<h2>Limitation 1: Training Data Cutoffs</h2>

<p>Every LLM has a knowledge cutoff — a date after which it was no longer trained on new data. Events, research, regulations, product launches, and organizational changes after that date are unknown to the model.</p>

<p><strong>The practical problem:</strong> AI doesn't always tell you when it's hitting its cutoff. It often answers confidently about recent topics, generating plausible-sounding but outdated information.</p>

<p><strong>How to work around it:</strong> For anything time-sensitive, supplement AI with a search-augmented tool (Perplexity, Bing, Google AI) or verify against current sources. When you need current facts, state the date in your prompt: "As of [current month/year], what do you know about X, and what should I verify against current sources?"</p>

<h2>Limitation 2: Hallucination</h2>

<p>We've covered this, but it bears repeating in the context of limitations: AI will generate confident-sounding false information. The frequency varies by model and task type, but no model is hallucination-free.</p>

<p>Hallucination is worst for: specific statistics, citations and references, details about real individuals, technical specifications, and anything requiring recent information.</p>

<p>Hallucination is least problematic for: synthesis of information you provide, structure and framing, creative generation, and anything where approximate accuracy is sufficient.</p>

<h2>Limitation 3: Bias in Training Data</h2>

<p>AI models learn from human-generated text. Human-generated text contains human biases — historical, cultural, demographic, and ideological. These biases are absorbed into the model and can surface in its outputs.</p>

<p><strong>Common manifestations:</strong></p>
<ul>
  <li>Over-representing certain cultural perspectives or reference points as default</li>
  <li>Reproducing demographic stereotypes from training data</li>
  <li>Presenting dominant viewpoints as consensus when meaningful dissent exists</li>
  <li>Better performance in English than other languages, reflecting training data distribution</li>
</ul>

<p><strong>How to work around it:</strong> Ask AI explicitly to consider multiple perspectives. Flag when you want a non-Western, non-English, or minority viewpoint represented. Review outputs for implicit assumptions about who "the audience" is or whose experience is treated as default.</p>

<h2>Limitation 4: Lack of Real-World Grounding</h2>

<p>AI models don't have access to your organization's data, your industry's current state, your specific context, or anything that wasn't in their training data. They operate entirely on what they were trained on plus what you provide in the conversation.</p>

<p>This means: generic answers when specific context would produce better ones. The fix is always to provide that context explicitly — your industry, your organization's constraints, your audience's specific characteristics, the document you're analyzing.</p>

<p>The more specific the context you provide, the less the model has to fall back on generic training-data patterns.</p>
`,

    demoTitle: 'Test the limits deliberately',
    demo: `
<p>A useful exercise for calibrating your AI use: deliberately test the limitations you've just learned about.</p>

<p>Try asking an AI about a recent event you know the details of — something from the last few months. Does it know? Does it acknowledge uncertainty? Does it confabulate confidently?</p>

<p>Try asking it to cite a specific statistic in its answer on a topic you know well. Check the citation. Does it exist? Is it accurate? Is it slightly wrong in a way that would be hard to catch without checking?</p>

<p>Doing this once or twice with your own examples builds the calibration that prevents you from being caught by these limitations in high-stakes situations.</p>
`,

    exercise: {
      title: 'Hunt for limitations in your own use case',
      prompt: `Choose a topic you know well — your industry, your job function, a subject you've studied seriously.

Ask an AI five questions about this topic where you already know the answers. Pay attention to:
1. Where does AI get things right?
2. Where does it get things subtly wrong (the most dangerous kind)?
3. Where does it confidently state something outdated?
4. Where does it reflect a bias or limited perspective you can identify?

Write down two or three specific limitations you observed. These are your personal calibration points — the specific areas where you know to be more careful when AI assists with your actual work.`,
      hint: 'Testing AI on topics you know well is one of the best ways to build accurate calibration for topics where you have to rely on it.',
      tools: ['Claude', 'ChatGPT', 'Gemini'],
    },

    recall: [
      {
        q: 'What are the four categories of AI limitation covered in this lesson? For each one, describe a scenario where that limitation could cause a real problem.',
        hint: 'Training cutoff, hallucination, bias, lack of grounding — what does each one look like in a real work situation?',
      },
      {
        q: 'What is the difference between "hallucination is worst for" and "hallucination is least problematic for"? Give one example of each.',
        hint: 'Think about what types of tasks require precise factual accuracy versus what types are acceptably served by approximate generation.',
      },
    ],

    reflection: `In your professional domain, which AI limitation is most likely to cause problems for you specifically? What practice or habit would you put in place to address it?`,

    keyTakeaway: 'AI has four key limitations: training data cutoffs, hallucination, training data bias, and lack of real-world grounding. None of these makes AI useless — but they all require calibrated awareness. Test AI on what you know to calibrate your trust for what you don\'t.',
  },

  {
    module: 11,
    slug: 'ai-ethics-for-practitioners',
    tier: 3,
    tierLabel: 'Tier 3 — Understanding Limits',
    title: 'AI Ethics for Practitioners',
    subtitle: 'Responsible use, attribution, and the questions you should always ask first.',
    duration: '11 min',
    hook: `Ethics in AI isn't an abstract philosophical exercise. It's a set of practical questions you face every time you use AI at work: Can I use AI for this? Do I need to disclose it? What data am I allowed to share with an AI tool? Who is responsible for AI outputs I use? These questions are arising in every organization, and the people who have thought through them in advance are the ones who don't get caught out.`,

    concept: `
<h2>The Data Question: What Can You Share?</h2>

<p>Every AI tool you use has a privacy policy and terms of service that govern what happens to the data you put into it. Before pasting anything into an AI tool, ask:</p>

<ul>
  <li>Does my organization's policy permit using this tool with this type of data?</li>
  <li>Is this data confidential, legally protected, or under NDA?</li>
  <li>Could including this information expose my organization or a client to risk?</li>
</ul>

<p><strong>General rules:</strong></p>
<ul>
  <li>Most consumer AI tools (the free tiers of ChatGPT, Gemini, etc.) may use your inputs to improve their models. Don't paste confidential business data, client information, or personal data into these.</li>
  <li>Enterprise versions (ChatGPT Enterprise, Claude for Work, Google Workspace AI) typically include data protection commitments. Know which version your organization has deployed.</li>
  <li>When in doubt: anonymize. Replace names, specific numbers, and identifying details before sharing for analysis.</li>
</ul>

<h2>The Attribution Question: Do You Need to Disclose?</h2>

<p>Disclosure norms for AI use are evolving rapidly and vary significantly by context. There is no single universal rule. But there are useful questions:</p>

<ul>
  <li><strong>Academic work:</strong> Most academic institutions now have explicit AI use policies. Know yours and follow it.</li>
  <li><strong>Journalism and publishing:</strong> Increasingly requiring disclosure of AI-generated or AI-assisted content.</li>
  <li><strong>Professional services:</strong> If your clients are paying for your expertise and judgment, using AI to generate the substantive output without disclosure may misrepresent what they're paying for.</li>
  <li><strong>Internal work:</strong> Generally more permissive, but organizational policy varies.</li>
</ul>

<p>A useful personal standard: if someone who would be affected by this work would feel misled if they knew how it was produced, you probably need to disclose or reconsider the use.</p>

<h2>The Responsibility Question: Who Owns the Output?</h2>

<p>AI generates outputs; humans are accountable for them. This is not a legal technicality — it's the operational reality. When you use AI to produce work that goes to a client, a colleague, or the public, you are responsible for that work. The AI cannot be held accountable. You can.</p>

<p>Practically, this means:</p>
<ul>
  <li>AI output you share without editing or verifying is output you're claiming as accurate</li>
  <li>AI errors in your work are your errors</li>
  <li>You cannot defend "the AI told me so" for professional or legal accountability</li>
</ul>

<h2>The Questions to Ask Before Using AI on Any Task</h2>

<ol>
  <li>Is this tool permitted by my organization's policy for this type of data?</li>
  <li>Does this data contain anything confidential, personally identifiable, or legally sensitive?</li>
  <li>Does the context require disclosure of AI use?</li>
  <li>Am I maintaining accountability for the accuracy and quality of this output?</li>
  <li>Who could be affected if this output is wrong, and what would the consequences be?</li>
</ol>
`,

    demoTitle: 'The checklist in practice',
    demo: `
<p>Consider this scenario: a colleague asks you to prepare a summary of client feedback for a board presentation. You have 50 pages of interview notes and want to use AI to synthesize them.</p>

<p>Running through the questions: the data includes client names and confidential business information — you need to check whether your AI tool has the appropriate data protection for this. The output will go to board members — you're accountable for accuracy. The summary will be used to make decisions — consequences of error are meaningful.</p>

<p>The right approach: anonymize the client data before analysis, use an enterprise-tier tool with appropriate data protection, verify key claims against the source documents, and produce the summary yourself with AI's help rather than using AI's summary verbatim.</p>
`,

    exercise: {
      title: 'Apply the ethics checklist to your real work',
      prompt: `Think of three tasks in your current work where you use or might use AI. For each one, run through the five questions from this lesson:

1. Is the tool permitted for this data?
2. Is there confidential or sensitive data involved?
3. Is disclosure required or appropriate?
4. Am I maintaining accountability for the output?
5. What are the consequences if the output is wrong?

Based on this review: are there any tasks where you were using AI in a way that needs adjustment? Are there tasks you weren't using AI for that would actually be straightforward to use responsibly?`,
      hint: 'The goal isn\'t to stop using AI — it\'s to use it thoughtfully. Most tasks will pass the checklist easily. A few will need adjustment.',
      tools: ['Claude', 'ChatGPT', 'Gemini'],
    },

    recall: [
      {
        q: 'What data should you generally not paste into a consumer-tier AI tool (the free versions of ChatGPT, Gemini, etc.)? Why?',
        hint: 'Think about the difference between consumer and enterprise terms of service, and what types of data require protection.',
      },
      {
        q: 'Who is accountable for AI-generated output that you share professionally? What does this mean practically for how you review and share AI outputs?',
        hint: 'The AI cannot be held responsible. What follows from that?',
      },
    ],

    reflection: `Is there a task you currently use AI for that would benefit from more careful application of the ethics checklist? What would you do differently? Is there a task you've been avoiding AI for due to ethical uncertainty that would actually be fine with the right precautions?`,

    keyTakeaway: 'AI use requires practical ethical judgment on four fronts: data privacy (what can you share?), attribution (what do you need to disclose?), accountability (you own the output), and impact (who\'s affected if it\'s wrong?). Run the five-question checklist before using AI on any consequential task.',
  },

  {
    module: 12,
    slug: 'foundations-assessment',
    tier: 3,
    tierLabel: 'Tier 3 — Foundations Gate',
    title: 'Foundations Assessment',
    subtitle: 'Consolidate your learning, measure your progress, and unlock AI~Workflows.',
    duration: '20 min',
    hook: `You've covered the foundations: what AI actually is, how it works mechanically, how to prompt effectively, where it's strong and where it fails, how to build daily habits, and how to use it responsibly. Now it's time to test how well you've integrated it. This isn't a multiple-choice quiz — it's a practical demonstration of what you can actually do.`,

    concept: `
<h2>What the Foundations Assessment Measures</h2>

<p>This assessment covers three types of competency that Foundations has built:</p>

<h3>Conceptual Understanding</h3>
<p>Can you accurately explain what AI is, how it works, and why it behaves the way it does? This includes: the prediction engine model, context windows and memory, hallucination and its causes, training data bias, and the distinction between AI's strengths and limitations.</p>

<h3>Practical Prompting Skill</h3>
<p>Can you construct prompts that reliably produce useful output? This includes: applying the RTF pattern, using role specification, providing appropriate context, specifying output format, and iterating effectively when the first response isn't right.</p>

<h3>Critical Evaluation</h3>
<p>Can you evaluate AI outputs accurately and responsibly? This includes: identifying hallucination risks, applying the verification habit, making disclosure decisions, and maintaining accountability for AI-assisted work.</p>

<h2>Assessment Format</h2>

<p>The assessment has four parts:</p>

<ol>
  <li><strong>Concept check</strong> (5 questions) — Short answer questions testing your understanding of core concepts. Write your answers before looking anything up.</li>
  <li><strong>Prompt critique</strong> (3 examples) — Review three prompts and identify what's missing and how you'd improve each one.</li>
  <li><strong>Real task</strong> — Complete a real task using AI with the approach you'd use in your actual work. Document your prompt, the output, any follow-ups, and your evaluation of whether the output was ready to use.</li>
  <li><strong>Reflection</strong> — A 200-word reflection on the biggest shift in how you think about or use AI since starting Foundations.</li>
</ol>

<h2>After the Assessment</h2>

<p>Once you've completed Foundations, you're ready for AI~Workflows — the Tier 4-6 track focused on consistent excellence, workflow integration, and critical evaluation. You'll move from competent use to systematic productivity.</p>
`,

    demoTitle: 'What "passing" looks like',
    demo: `
<p>There's no numerical pass/fail in this assessment. The standard is: can you demonstrate the core competencies through your actual work?</p>

<p>The concept check requires accurate, specific answers — not perfect recall of phrasing, but genuine understanding of the ideas.</p>

<p>The prompt critique requires identifying specific, actionable improvements — not just "this prompt could be better" but "this prompt needs a role because without it the AI will default to generic phrasing, and it needs a format spec because a bullet list would be more usable than a paragraph here."</p>

<p>The real task requires showing your work — the prompt, the output, and your assessment of whether it was good enough to use.</p>

<p>The reflection requires honesty — what actually changed for you, not what sounds like the right answer.</p>
`,

    exercise: {
      title: 'Foundations Assessment',
      prompt: `Complete all four parts:

**Part 1 — Concept Check (write answers before looking back at the lessons):**
1. In one sentence, what is a Large Language Model actually doing when it generates text?
2. Why does AI sometimes state false information with complete confidence?
3. What is a context window and why does it matter for how you use AI?
4. Name two types of AI output you should always verify before using professionally. Explain why for each.
5. What is the difference between augmenting your work with AI versus replacing your judgment with AI?

**Part 2 — Prompt Critique (improve each of these prompts):**
- "Write a summary."
- "Help me with my presentation."
- "What should I do?"

For each: identify what's missing and write an improved version for a real use case from your own work.

**Part 3 — Real Task:**
Choose a real task from your work. Use AI to complete it, documenting: your initial prompt, the output, any follow-up prompts, and your assessment of whether the output was ready to use or needed more work.

**Part 4 — Reflection:**
In 200 words: what is the single biggest shift in how you think about or use AI since starting this course?`,
      hint: 'Take the time this deserves. The reflection especially — write what\'s actually true for you, not what sounds like the right answer.',
      tools: ['Claude', 'ChatGPT', 'Gemini'],
    },

    recall: [
      {
        q: 'Looking back across all 12 modules: what is the single most important idea in Foundations? Why that one?',
        hint: 'There\'s no right answer. This is about identifying what shifted your thinking most significantly.',
      },
      {
        q: 'If you had to teach the most important concept from Foundations to a colleague who has never used AI — in three minutes, without jargon — what would you say?',
        hint: 'Apply the Feynman principle: if you can\'t explain it simply, you don\'t fully understand it yet.',
      },
    ],

    reflection: `Foundations complete. You now have the mental model, the prompting fundamentals, and the critical evaluation habits to use AI effectively and responsibly. What do you want to do with it? What problem will you solve first that you couldn't have solved as well before?`,

    keyTakeaway: 'Foundations gives you the model, the fundamentals, and the judgment. The next step — AI~Workflows — builds on this to develop consistent excellence, workflow integration, and critical evaluation at the intermediate level.',
  },
];

export function getLessonBySlug(slug: string): Lesson | undefined {
  return foundations.find(l => l.slug === slug);
}

export function getAdjacentLessons(slug: string): { prev: Lesson | null; next: Lesson | null } {
  const idx = foundations.findIndex(l => l.slug === slug);
  return {
    prev: idx > 0 ? foundations[idx - 1] : null,
    next: idx < foundations.length - 1 ? foundations[idx + 1] : null,
  };
}
