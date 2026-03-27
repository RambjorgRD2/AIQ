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
  tier: 4 | 5 | 6;
  tierLabel: string;
  title: string;
  subtitle: string;
  duration: string;
  hook: string;
  concept: string;
  demoTitle: string;
  demo: string;
  exercise: Exercise;
  recall: RecallQuestion[];
  reflection: string;
  keyTakeaway: string;
}

export const workflows: Lesson[] = [
  {
    module: 1,
    slug: 'from-user-to-practitioner',
    tier: 4,
    tierLabel: 'Tier 4 — Intermediate Prompting',
    title: 'From User to Practitioner',
    subtitle: "The mindset shift that separates occasional users from people who consistently get results.",
    duration: '10 min',
    hook: `There's a specific gap between people who use AI occasionally and people who use it well consistently. It's not a tool gap — they're using the same tools. It's a mindset gap. Occasional users treat AI as a shortcut. Practitioners treat it as a skill. This module is about making that shift explicit so you can accelerate through it deliberately.`,
    concept: `
<h2>The Shortcut Mindset vs. The Practitioner Mindset</h2>

<p>The shortcut mindset treats each AI interaction as a one-off transaction: you have a task, AI helps, you move on. No accumulation, no improvement loop, no system. Results are inconsistent because the inputs are inconsistent.</p>

<p>The practitioner mindset treats AI as a skill domain with its own learning curve. Each interaction is both output and data. What worked? What didn't? What would you do differently? Over time, you build intuition, documented patterns, and repeatable approaches that compound.</p>

<p>The practical difference: a practitioner finishes a task and spends 60 seconds noting what prompt approach worked. Six months later, that habit has built a personal knowledge base worth more than any prompt guide they could have bought.</p>

<h2>The Four Shifts</h2>

<h3>1. From single prompts to conversation design</h3>
<p>Occasional users write one prompt and accept what they get. Practitioners think in conversation arcs: how will I open this, what follow-ups will I need, how do I want to end the session? Designing the conversation before you start produces dramatically more useful outputs.</p>

<h3>2. From hoping to evaluating</h3>
<p>Occasional users read AI output and think "is this good enough?" Practitioners evaluate against explicit criteria: accurate, complete, appropriate tone, right length, serving the actual goal? The shift from passive reception to active evaluation changes what you accept and what you push back on.</p>

<h3>3. From generic to specific</h3>
<p>Occasional users use generic prompts that could apply to anyone. Practitioners build context into every prompt: their industry, their audience, their constraints, their voice. The more specific your context, the less the model falls back on generic training-data patterns.</p>

<h3>4. From one-off to repeatable</h3>
<p>The highest-leverage practitioner habit: when a prompt or approach works, document it. Not in a elaborate system — a simple note is enough. Over time, you build a prompt library that is specific to your work, your voice, and your real use cases. This is an asset that compounds.</p>

<h2>The Practitioner Loop</h2>

<p>Practitioners operate a continuous improvement loop on their AI use:</p>
<ol>
  <li><strong>Intention:</strong> What am I trying to achieve? What does "done" look like?</li>
  <li><strong>Execution:</strong> Design the prompt with role, context, and format. Execute.</li>
  <li><strong>Evaluation:</strong> Did this hit the mark? Why or why not?</li>
  <li><strong>Capture:</strong> If it worked, note the approach. If it didn't, note what to change.</li>
</ol>

<p>This loop takes 2 extra minutes per significant AI task. Over a year, it's the difference between stagnating at your current skill level and systematically improving.</p>
`,
    demoTitle: 'The evaluation difference in practice',
    demo: `
<p>Here is the same output evaluated through two different lenses.</p>

<p><strong>Output:</strong> An AI-generated executive summary of a 20-page report.</p>

<p><strong>Shortcut evaluation:</strong> "That's pretty good. I'll use it." → paste and send.</p>

<p><strong>Practitioner evaluation:</strong> Does this accurately represent the report's main argument? Are the three most critical findings here? Is the length right for this audience? Is the tone appropriate for an executive who didn't commission this work? Does it end with a clear implication or recommendation?</p>

<p>The practitioner catches three things the shortcut approach wouldn't: a key finding is missing, the third paragraph hedges too much for an executive audience, and the summary ends on data rather than implication.</p>

<p>Two minutes of structured evaluation versus two seconds of "looks fine." The output quality difference is significant.</p>
`,
    exercise: {
      title: 'Run the practitioner loop on a real task',
      prompt: `Choose a task you would normally use AI for. Before you open any AI tool, write down:

1. What is the specific outcome I need? (Be precise — not "a good email" but "a 200-word email to a new client that establishes credibility without overselling")
2. What prompt approach will I use? (Role? Context? Format?)
3. What are my evaluation criteria? (What makes this output "done"?)

Then execute the task and evaluate the output against your criteria. Did it hit all three? If not, what specifically missed?

Finally: note one thing about your prompting approach that you'd change next time.`,
      hint: "The pre-work is the point. Most people don't define what 'good' looks like before they start. That's why 'good enough' becomes the default.",
      tools: ['Claude', 'ChatGPT', 'Gemini'],
    },
    recall: [
      {
        q: "What are the four mindset shifts that separate occasional AI users from practitioners? Describe each one in your own words.",
        hint: "Single prompts → conversation design; hoping → evaluating; generic → specific; one-off → repeatable.",
      },
      {
        q: "What is the practitioner loop, and why does the capture step matter?",
        hint: "Think about compounding: what happens to someone who documents what works versus someone who doesn't, over 12 months.",
      },
    ],
    reflection: `Honestly: which of the four mindset shifts do you most need to make? What's one concrete thing you'd do differently in your next AI session if you were operating as a practitioner rather than an occasional user?`,
    keyTakeaway: "The gap between inconsistent and consistently excellent AI results is a mindset gap, not a tool gap. Practitioners evaluate deliberately, build context into every prompt, and capture what works. The practitioner loop compounds — occasional use doesn't.",
  },

  {
    module: 2,
    slug: 'advanced-prompt-engineering',
    tier: 4,
    tierLabel: 'Tier 4 — Intermediate Prompting',
    title: 'Advanced Prompt Engineering',
    subtitle: "Chain-of-thought, few-shot examples, role framing, and constraint-setting — the full toolkit.",
    duration: '14 min',
    hook: `You've used the basics: role, context, format. This module adds the techniques that separate competent prompting from expert prompting. Chain-of-thought gets AI to reason before concluding. Few-shot examples transfer your exact standards. System-level framing shapes an entire conversation. Constraint-setting produces precision outputs. These aren't tricks — they're levers that multiply the value of everything you've already learned.`,
    concept: `
<h2>Chain-of-Thought: Make AI Show Its Work</h2>

<p>Standard prompts ask for conclusions. Chain-of-thought prompts ask for reasoning. The difference is substantial: when AI is instructed to work through a problem step by step before answering, the quality of its reasoning — and therefore its conclusions — improves significantly.</p>

<p><strong>The mechanism:</strong> By generating intermediate reasoning steps, the model creates additional context for each subsequent token. This reduces the probability of logical jumps that lead to wrong conclusions.</p>

<p><strong>How to trigger it:</strong></p>
<ul>
  <li>"Before answering, think through this step by step."</li>
  <li>"Walk me through your reasoning before giving me your recommendation."</li>
  <li>"Work through the key considerations first, then give me your conclusion."</li>
</ul>

<p><strong>When to use it:</strong> Decisions, analyses, complex problem-solving — any task where the reasoning matters as much as the answer. Not needed for simple generation tasks.</p>

<h2>Few-Shot Prompting: Transfer Your Standards</h2>

<p>Describing the output you want is harder than showing it. Few-shot prompting provides 2-5 examples of what "good" looks like before asking for a new output. The model pattern-matches to your examples rather than to generic training data.</p>

<p><strong>Most powerful use case:</strong> Brand voice. If you have examples of writing in your organization's specific voice, paste them. The model will calibrate to your examples far more precisely than any description of "professional but approachable, direct but not terse."</p>

<p><strong>Template:</strong></p>
<div class="demo-prompt">Here are three examples of [what you want]:
Example 1: [example]
Example 2: [example]
Example 3: [example]

Now create [new thing] in the same style/format/tone.</div>

<h2>System-Level Framing: Shape the Entire Conversation</h2>

<p>Most AI tools allow you to set a system prompt — instructions that persist across the entire conversation rather than applying only to one message. This is one of the most underused capabilities available.</p>

<p><strong>What to put in a system prompt:</strong></p>
<ul>
  <li>The role you want AI to maintain throughout ("You are a senior editor who prioritizes clarity and cuts mercilessly")</li>
  <li>Persistent context ("You are helping me with [project]. Background: [key facts]")</li>
  <li>Behavioral constraints ("Always ask for clarification before assuming context. Never pad responses.")</li>
  <li>Output defaults ("Respond in bullet points unless I explicitly ask for prose")</li>
</ul>

<p>In tools without system prompts, open every conversation with this context as your first message.</p>

<h2>Constraint-Setting: Precision Through Limits</h2>

<p>Constraints are one of the most underrated prompting tools. They focus AI output by eliminating the space for generic defaults. The more specific your constraints, the more specific the output.</p>

<p><strong>Constraint categories:</strong></p>
<ul>
  <li><strong>Length:</strong> "Under 150 words," "exactly 3 bullet points," "one sentence"</li>
  <li><strong>Vocabulary:</strong> "No jargon," "no corporate buzzwords," "no words longer than three syllables"</li>
  <li><strong>Structure:</strong> "Problem → cause → solution," "start with the conclusion," "end with a single call to action"</li>
  <li><strong>Exclusions:</strong> "Do not mention competitors," "avoid the words 'leverage' and 'synergy'"</li>
  <li><strong>Audience:</strong> "For someone with no technical background," "for a skeptical CFO"</li>
</ul>

<h2>Combining Techniques</h2>

<p>The real leverage comes from combining these techniques in a single prompt. A well-constructed advanced prompt might:</p>
<ol>
  <li>Set a role (framing)</li>
  <li>Provide examples of the desired output (few-shot)</li>
  <li>Ask for reasoning before conclusions (chain-of-thought)</li>
  <li>Specify precise constraints on the output</li>
</ol>

<p>This isn't complexity for its own sake — each element reduces the decisions the model has to make on your behalf, which means fewer generic defaults and more calibrated outputs.</p>
`,
    demoTitle: 'Chain-of-thought vs. standard: the same question',
    demo: `
<p><strong>Standard prompt:</strong> "Should I use AI to automate our customer support responses?"</p>

<p>Typical output: a balanced list of pros and cons. Generic. Usable as a starting point, not as a decision.</p>

<p><strong>Chain-of-thought prompt:</strong> "I'm considering using AI to automate our customer support responses. Before giving me a recommendation, think through: (1) What information would I need to make this a good decision? (2) What are the specific failure modes I should worry about? (3) What would success look like and how would I measure it? Then give me your recommendation based on that reasoning."</p>

<p>Output: a structured analysis that identifies what's missing from the question (what type of support? what volume? what industry?), maps specific risks (accuracy errors reaching customers, loss of empathy signal, escalation failures), defines measurable success criteria, and gives a conditional recommendation. Actionable rather than academic.</p>

<p>Same question. Completely different usefulness. The difference is the reasoning instruction.</p>
`,
    exercise: {
      title: 'Build a combined technique prompt',
      prompt: `Choose a real decision or complex task from your work. Build a prompt that uses at least three of the four techniques from this module:

1. Chain-of-thought: ask for reasoning before conclusion
2. Few-shot: provide 2-3 examples of what a good output looks like
3. System framing: set a persistent role/context at the start
4. Constraints: specify at least 3 specific constraints on the output

Run the prompt. Then run the same task with a basic prompt (just describe what you want). Compare the outputs.

Document: which technique had the most impact on output quality for this type of task?`,
      hint: "You don't need all four every time. This exercise is about learning what each adds so you can choose deliberately.",
      tools: ['Claude', 'ChatGPT'],
    },
    recall: [
      {
        q: "Explain chain-of-thought prompting: what it is, why it works mechanically, and when to use it versus when it's unnecessary.",
        hint: "Think about the mechanism: what does generating intermediate reasoning steps do to the quality of subsequent tokens?",
      },
      {
        q: "You need AI to write in your organization's exact brand voice. Which technique is most effective, and how would you apply it?",
        hint: "Think about showing versus describing. What does few-shot prompting give the model that a description of 'warm but professional' doesn't?",
      },
    ],
    reflection: `Which of these four techniques are you most likely to add to your regular prompting practice? What specific type of task in your work would benefit most from it?`,
    keyTakeaway: "Chain-of-thought improves reasoning quality. Few-shot transfers your exact standards. System framing shapes whole conversations. Constraints produce precision. Combining them multiplies impact. Each technique reduces generic defaults by narrowing the space of valid outputs.",
  },

  {
    module: 3,
    slug: 'designing-ai-workflows',
    tier: 4,
    tierLabel: 'Tier 4 — Intermediate Prompting',
    title: 'Designing AI Workflows',
    subtitle: "Map your tasks. Identify where AI adds leverage. Build repeatable systems, not one-off experiments.",
    duration: '13 min',
    hook: `A prompt is a single move. A workflow is a system. The difference matters because systems scale and compound in ways that individual prompts don't. Once you've designed a workflow — mapped the task, identified where AI adds leverage, defined the handoffs — you can run it repeatedly, hand it to others, and improve it over time. This module is about thinking in workflows, not just prompts.`,
    concept: `
<h2>What Makes Something a Workflow vs. a Prompt</h2>

<p>A workflow has:</p>
<ul>
  <li>A defined input (what triggers it)</li>
  <li>A clear sequence of steps (including which steps are AI-assisted and which aren't)</li>
  <li>A defined output (what it produces)</li>
  <li>Quality criteria (how you know it worked)</li>
</ul>

<p>A prompt has none of these. It's a one-off request. Workflows are the difference between using AI occasionally and using it systematically.</p>

<h2>The Task Mapping Process</h2>

<p>Before you can design a workflow, you need to understand the task at the component level. Most tasks that seem like single things are actually sequences of 4-8 subtasks. Breaking them down reveals where AI adds the most leverage and where human judgment is essential.</p>

<p><strong>The mapping questions:</strong></p>
<ol>
  <li>What are the individual steps in this task, from start to finish?</li>
  <li>For each step: is this primarily information processing, generation, or judgment?</li>
  <li>Which steps have high AI leverage (generation, synthesis, formatting)?</li>
  <li>Which steps require human judgment that AI shouldn't replace?</li>
  <li>What are the quality checkpoints — where must a human review before proceeding?</li>
</ol>

<h2>The AI Leverage Matrix</h2>

<p>Not all task components benefit equally from AI. A useful mental model:</p>

<p><strong>High AI leverage (automate or heavily assist):</strong> First drafts, research synthesis, formatting and reformatting, generating options, translating between styles/audiences, summarizing large inputs.</p>

<p><strong>Medium AI leverage (use AI, then review carefully):</strong> Editing and refinement, analysis with provided data, argument structuring, identifying gaps.</p>

<p><strong>Low AI leverage (AI input only, human decides):</strong> Final judgment calls, relationship-sensitive communication, decisions with ethical implications, anything where being wrong has significant consequences.</p>

<h2>Workflow Design Patterns</h2>

<p><strong>Pattern 1: Draft → Refine → Polish</strong><br>
AI generates a first draft. Human evaluates and directs revisions. AI polishes. Human approves. Good for: writing, reports, proposals.</p>

<p><strong>Pattern 2: Research → Synthesize → Apply</strong><br>
Human provides source material. AI synthesizes and extracts. Human applies judgment to synthesized output. Good for: research tasks, competitive analysis, literature review.</p>

<p><strong>Pattern 3: Options → Evaluate → Develop</strong><br>
AI generates multiple options. Human evaluates and selects. AI develops the chosen option. Good for: strategy, creative work, problem-solving.</p>

<p><strong>Pattern 4: Input → Transform → Verify</strong><br>
Human provides structured input (data, notes). AI transforms into desired format. Human verifies accuracy. Good for: data formatting, document generation, template population.</p>

<h2>Documenting Your Workflows</h2>

<p>The single most valuable thing you can do after building a workflow that works: write it down. A documented workflow has:</p>
<ul>
  <li>Trigger: what situation calls for this workflow?</li>
  <li>Steps: each step, with the prompt for AI steps</li>
  <li>Handoffs: where human review happens and what to check</li>
  <li>Output: what the workflow produces</li>
  <li>Pitfalls: what went wrong the first few times and how to avoid it</li>
</ul>

<p>A one-page workflow document takes 10 minutes to write and can save hours over the following months.</p>
`,
    demoTitle: 'Mapping a real workflow',
    demo: `
<p><strong>Task:</strong> Prepare for a client meeting about a new project proposal.</p>

<p><strong>Typical approach (no workflow):</strong> Review some notes, maybe look up the client, wing it.</p>

<p><strong>Mapped workflow:</strong></p>
<ol>
  <li>Input: client name, project brief, previous interactions — <em>Human provides</em></li>
  <li>Research synthesis: summarize what AI knows about the client's industry challenges — <em>AI, high leverage</em></li>
  <li>Gap identification: what do I not know that I should? — <em>AI generates questions, human judges which matter</em></li>
  <li>Objection prep: likely concerns about this type of proposal — <em>AI generates, human refines</em></li>
  <li>Opening framing: draft a meeting opening that acknowledges their context — <em>AI drafts, human edits</em></li>
  <li>Final review: is this accurate and appropriate for this specific relationship? — <em>Human only</em></li>
</ol>

<p>Total AI time: 15 minutes. Result: a meeting preparation that would have taken 45 minutes without AI — and would have been less thorough.</p>
`,
    exercise: {
      title: 'Map and document one workflow',
      prompt: `Choose a task you do regularly — ideally one that takes 30+ minutes and involves both information processing and judgment.

Step 1: Write out every substep (aim for 6-10 steps).
Step 2: For each step, mark it: High AI leverage / Medium AI leverage / Low AI leverage.
Step 3: Identify which pattern it fits (Draft→Refine→Polish, Research→Synthesize→Apply, Options→Evaluate→Develop, or Input→Transform→Verify).
Step 4: Run the workflow once using AI for the high-leverage steps.
Step 5: Document it: trigger, steps with prompts, handoffs, output, pitfalls.

Time how long it takes with versus without AI. That number is your ROI estimate.`,
      hint: "Don't try to automate everything in the first pass. High-leverage steps first, human judgment steps always.",
      tools: ['Claude', 'ChatGPT', 'Notion', 'Any notes tool'],
    },
    recall: [
      {
        q: "What are the four components that distinguish a workflow from a prompt?",
        hint: "Input, sequence, output, quality criteria — what does having all four give you that a prompt doesn't?",
      },
      {
        q: "Describe the AI leverage matrix. Give one example of a task component that belongs in each of the three categories.",
        hint: "Think about what types of work benefit most from AI generation versus where human judgment is non-negotiable.",
      },
    ],
    reflection: `What is the one task in your work that would benefit most from being turned into a documented workflow? What's preventing you from designing it today?`,
    keyTakeaway: "Workflows compound; prompts don't. Map tasks to components, identify where AI adds leverage, design the handoffs where human judgment applies, then document the workflow so it's repeatable. One well-designed workflow is worth more than a hundred individual prompt experiments.",
  },

  {
    module: 4,
    slug: 'prompt-libraries-and-templates',
    tier: 4,
    tierLabel: 'Tier 4 — Intermediate Prompting',
    title: 'Prompt Libraries & Templates',
    subtitle: "Build a personal prompt library. Document what works and why. Share it with your team.",
    duration: '10 min',
    hook: `A prompt library is a practitioner's highest-leverage asset. Every time you find a prompt that works well for a recurring task, you're building something that will save you that discovery process forever. After six months of deliberate capture, your library is better than anything you could buy — because it's calibrated to your specific work, your voice, and your real use cases.`,
    concept: `
<h2>What Goes in a Prompt Library</h2>

<p>A prompt library is not a collection of clever tricks you found on the internet. It's a documented record of prompts that work specifically for your recurring tasks. The criteria for inclusion: you've used it at least twice, it produces reliably good outputs, and the task recurs often enough that having the prompt saves real time.</p>

<p><strong>High-value library categories:</strong></p>
<ul>
  <li>Email templates (difficult conversations, status updates, new client intros, follow-ups)</li>
  <li>Document analysis prompts (extract key points, identify gaps, compare documents)</li>
  <li>Writing assistance (tone adjustment, length reduction, audience adaptation)</li>
  <li>Research prompts (framework generation, pros/cons, scenario planning)</li>
  <li>Meeting prep (agenda refinement, pre-read synthesis, objection mapping)</li>
  <li>Task-specific prompts for your professional domain</li>
</ul>

<h2>The Library Entry Format</h2>

<p>Each library entry should have four elements:</p>
<ol>
  <li><strong>Name:</strong> A descriptive name you'll recognize when you need it ("Executive summary — skeptical audience")</li>
  <li><strong>When to use:</strong> The trigger condition that calls for this prompt</li>
  <li><strong>The prompt:</strong> The actual text, with [PLACEHOLDERS] for the parts that change each time</li>
  <li><strong>Notes:</strong> What to watch for, common failures, tips for this specific prompt</li>
</ol>

<h2>Building the Library Without Extra Work</h2>

<p>The failure mode for prompt libraries: treating it as a separate project. The sustainable approach: capture as you go.</p>

<p>The habit is simple: when you finish an AI session that produced something really useful, spend 60 seconds adding the core prompt to your library before you close the tab. That's it. No elaborate system required.</p>

<p>Tools: a plain text file, Notion, Apple Notes, Obsidian — whatever you already use for notes. The format matters less than the habit.</p>

<h2>Team Prompt Libraries</h2>

<p>A team prompt library multiplies individual discovery across the whole team. Instead of everyone separately figuring out how to get good AI outputs for the same types of tasks, the best prompts get shared and everyone benefits.</p>

<p><strong>What makes team libraries work:</strong></p>
<ul>
  <li>A shared, accessible location (Notion, Confluence, Google Doc — whatever the team already uses)</li>
  <li>Clear categories that match the team's actual work</li>
  <li>Each entry has a context note ("who uses this and when")</li>
  <li>Regular review: prompts get outdated as AI models improve</li>
  <li>Attribution: knowing who built a prompt and who to ask questions of</li>
</ul>
`,
    demoTitle: 'A library entry in practice',
    demo: `
<p>Here's an example prompt library entry for a common task:</p>

<p><strong>Name:</strong> Status update — complex project, mixed audience</p>
<p><strong>When to use:</strong> Weekly project updates to a group that includes both technical and non-technical stakeholders</p>
<p><strong>Prompt:</strong></p>
<div class="demo-prompt">You are a project manager writing a weekly status update. The audience includes both technical team members and non-technical stakeholders.

Project: [PROJECT NAME]
This week: [BULLET POINTS OF WHAT HAPPENED]
Issues: [ANY BLOCKERS OR CONCERNS]
Next week: [PLANNED WORK]

Write a status update that:
- Opens with the one-sentence takeaway a non-technical executive needs to know
- Covers technical detail in a separate section labeled for the team
- Is direct about issues without creating alarm
- Is under 300 words total</div>

<p><strong>Notes:</strong> If there are no issues, still include the section with "None this week" — removing it makes it look like you forgot. The one-sentence executive summary is always the hardest part; spend time on it.</p>
`,
    exercise: {
      title: 'Start your prompt library with 5 entries',
      prompt: `Look back at the past two weeks of work. Identify 5 tasks where you used or could have used AI.

For each one, write a library entry:
1. Name (descriptive, specific)
2. When to use (trigger condition)
3. The prompt with [PLACEHOLDERS] for the parts that change
4. One note about what to watch out for

Put these somewhere you'll actually find them again — not a new tool, whatever you already use.

Then: share one entry with a colleague and get their feedback. Does it work for their version of the same task?`,
      hint: "Five is the right number to start. Ten feels like a project. Five feels like a useful list.",
      tools: ['Notion', 'Obsidian', 'Apple Notes', 'Any notes tool'],
    },
    recall: [
      {
        q: "What are the four elements of a useful prompt library entry? Why does each one matter?",
        hint: "Name, trigger condition, prompt with placeholders, notes — what does a future-you need to be able to use this entry efficiently?",
      },
      {
        q: "What's the sustainable habit for building a prompt library without it becoming a separate project?",
        hint: "Think about timing: when is the best moment to capture a prompt, and how long should it take?",
      },
    ],
    reflection: `What are the 3 tasks in your work you do most often that involve AI or could involve AI? These are your highest-priority library entries. Write them down now.`,
    keyTakeaway: "A prompt library built from your own recurring tasks is more valuable than any generic collection. Capture as you go — 60 seconds after a successful AI session. Four elements per entry: name, trigger, prompt with placeholders, notes. A team library multiplies individual discovery.",
  },

  {
    module: 5,
    slug: 'ai-for-strategic-research',
    tier: 4,
    tierLabel: 'Tier 4 — Intermediate Prompting',
    title: 'AI for Strategic Research',
    subtitle: "Go beyond search. Use AI to synthesize, compare, and generate insights from complex information.",
    duration: '12 min',
    hook: `Strategic research isn't finding information — it's transforming information into insight. AI is exceptionally good at the transformation step: taking a body of information you've gathered and helping you find patterns, surface tensions, generate frameworks, and identify what's missing. The limitation is the same as always: it can't replace your access to the right sources, and it can't verify its own factual claims. This module is about maximizing the transformation value while managing the verification risk.`,
    concept: `
<h2>The Research Stack: Where AI Fits</h2>

<p>Think of strategic research as a stack of three layers:</p>
<ol>
  <li><strong>Source gathering:</strong> Finding the right information (primary sources, databases, interviews, documents). AI is unreliable here for specific facts — use it to generate search queries, identify what sources you need, and map the information landscape.</li>
  <li><strong>Synthesis:</strong> Extracting meaning from gathered information. AI is excellent here — especially when you provide the source material. Pattern identification, comparison, framework generation, gap analysis.</li>
  <li><strong>Implication:</strong> What does this mean for your specific situation? This requires your judgment, organizational context, and domain expertise. AI can suggest hypotheses; only you can evaluate them against reality.</li>
</ol>

<h2>The Synthesis Toolkit</h2>

<p><strong>Comparative analysis:</strong> "Given these three [reports/positions/options], compare them across these dimensions: [list]. Then identify the most significant point of disagreement and the most important question they collectively leave unanswered."</p>

<p><strong>Pattern extraction:</strong> "I'm going to paste five [customer interviews/analyst reports/case studies]. After reading all of them, identify: the three themes that appear most consistently, and two patterns that appear in some but are notably absent in others."</p>

<p><strong>Gap mapping:</strong> "Based on this research, what important questions remain unanswered? What would I need to know to be more confident in a decision based on this information?"</p>

<p><strong>Framework generation:</strong> "Given this information, what are the most useful ways to organize or categorize it? Generate three different frameworks for thinking about this problem and explain what each one reveals."</p>

<p><strong>Steelmanning:</strong> "Here is [my position/proposed decision]. Play devil's advocate: what is the strongest possible case against this? What evidence would most concern someone who disagreed?"</p>

<h2>Managing Hallucination Risk in Research</h2>

<p>In research contexts, hallucination risk is highest for: statistics, citations, specific claims about real organizations or people, and anything AI generates without a document you provided.</p>

<p><strong>The grounding rule:</strong> For any specific claim that will inform a decision — especially numerical claims — ask: "Is this from a document I provided, or from training data?" If the latter, verify before using.</p>

<p><strong>The citation test:</strong> Ask AI to cite its sources for any factual claim. If it can't produce a specific, verifiable citation, treat the claim as a hypothesis to verify, not a fact to use.</p>
`,
    demoTitle: 'Synthesis vs. search: the same research question',
    demo: `
<p><strong>The weak approach:</strong> "What are the main trends in [industry]?" → AI generates a generic trends list from training data. Plausible, but not grounded in current sources, not specific to your question, and not actionable.</p>

<p><strong>The synthesis approach:</strong> Gather 5-7 recent sources (analyst reports, news articles, earnings calls, competitor blogs). Paste them in batches and ask: "Based only on the information in these documents, what are the three most significant trends? For each one, what is the strongest evidence, and what is the most significant uncertainty?"</p>

<p>The second approach takes longer but produces insights grounded in real, current sources — with the uncertainty made explicit rather than hidden.</p>
`,
    exercise: {
      title: 'Run a structured synthesis on real research',
      prompt: `Choose a research question relevant to your work. Gather 4-6 sources (articles, reports, documents).

Run this synthesis sequence:
1. Paste all sources and ask: "What are the three most consistent themes across all these sources?"
2. Ask: "What is the most significant point of disagreement or tension between these sources?"
3. Ask: "What important questions do these sources collectively leave unanswered?"
4. Ask: "Given this research, what is the strongest case for [your position or hypothesis]? What is the strongest case against it?"

Compare this to a standard Google search approach on the same question. What did the synthesis approach surface that search didn't?`,
      hint: "Paste actual source content, not just summaries. The more complete the input, the more grounded the synthesis.",
      tools: ['Claude', 'ChatGPT', 'Perplexity'],
    },
    recall: [
      {
        q: "Describe the three-layer research stack. Where does AI add the most value? Where is human judgment irreplaceable?",
        hint: "Source gathering, synthesis, implication — what is AI reliable for versus where does it need verification or domain judgment?",
      },
      {
        q: "What is the grounding rule for avoiding hallucination in research contexts? Give an example of how you'd apply it.",
        hint: "Think about the distinction between AI analyzing documents you provided versus AI generating claims from training data.",
      },
    ],
    reflection: `What is the most important research task in your work right now? How would you apply the synthesis toolkit to it? Which of the five synthesis techniques would be most valuable for that specific task?`,
    keyTakeaway: "AI's research value is in synthesis, not sourcing. Provide documents; get grounded insights. For any specific factual claim, apply the grounding rule: was this derived from sources I provided, or from training data? Gap mapping and steelmanning are the two highest-leverage synthesis moves.",
  },

  {
    module: 6,
    slug: 'writing-with-ai-at-pro-level',
    tier: 4,
    tierLabel: 'Tier 4 — Intermediate Prompting',
    title: 'Writing with AI at Pro Level',
    subtitle: "From first draft to final polish. How to keep your voice while multiplying your output.",
    duration: '12 min',
    hook: `Pro-level AI writing isn't about volume — it's about quality and authenticity at scale. The writers who use AI most effectively produce work that is indistinguishable from their best unassisted output, in a fraction of the time. The ones who produce obvious AI slop have outsourced the thinking and kept only the typing. This module is about the difference — how to use AI as a genuine writing multiplier without losing what makes your writing yours.`,
    concept: `
<h2>The Voice Preservation Problem</h2>

<p>AI's default writing voice is optimized for plausibility, not distinctiveness. It's articulate, balanced, and forgettable. It uses the vocabulary of competent corporate communication: "leverage," "implement," "ensure alignment," "stakeholders." It qualifies everything. It never takes a strong position without immediately hedging it.</p>

<p>Your voice is the opposite of this — it has opinions, preferences, rhythms, and tells. Preserving it while using AI requires deliberate technique, not hope.</p>

<h2>The Four-Layer Voice System</h2>

<h3>Layer 1: Sample injection</h3>
<p>Before asking AI to write anything in your voice, paste 3-5 examples of your own writing and say: "Match the tone, rhythm, and vocabulary of these examples. Note what makes them distinctive and apply that to your response." This works better than any description you could give.</p>

<h3>Layer 2: Anti-vocabulary lists</h3>
<p>Every writer has words and phrases they never use. AI has default words it always uses. Build a short list of AI defaults to prohibit: "Do not use: leverage, synergy, implement, ensure, stakeholders, cutting-edge, game-changing, innovative." This alone dramatically reduces generic-sounding output.</p>

<h3>Layer 3: Position clarity</h3>
<p>AI defaults to "on one hand / on the other hand" balance. If your voice takes positions, tell it to: "Take a clear position and defend it. Don't hedge unless the evidence genuinely warrants uncertainty." If your voice is genuinely balanced, tell it that explicitly too.</p>

<h3>Layer 4: Edit as the final step</h3>
<p>No matter how well-calibrated your prompt, the last 20% of voice recovery happens in editing. Treat AI's output as a strong first draft, not a finished piece. Read it aloud — where does it sound like you? Where does it sound like a committee wrote it? Fix the second category.</p>

<h2>The Output Multiplier Framework</h2>

<p>Pro AI writers think in terms of one piece of core thinking generating multiple outputs:</p>
<ul>
  <li>Write the core argument / key insight once, in your own words</li>
  <li>Ask AI to adapt it: "Turn this into a LinkedIn post," "make this a 3-slide executive summary," "write this as an email to a skeptical CFO"</li>
  <li>Edit each adaptation for voice and accuracy</li>
</ul>

<p>One strong original insight → 4-6 adapted outputs, each edited → a week of content produced in a morning. This is the actual AI writing multiplier, not "have AI write it from scratch."</p>

<h2>The Two Things AI Does Better Than You</h2>

<p>Even excellent writers should use AI for two specific writing tasks where AI consistently outperforms human first-pass attempts:</p>

<p><strong>Structural reordering:</strong> "Here is my draft. Suggest three different ways to reorder the argument. For each one, explain what it emphasizes differently." Humans are attached to the order they wrote in. AI isn't.</p>

<p><strong>Audience translation:</strong> "Rewrite this for an audience of [specific audience]. Assume they care about [specific concern] and are skeptical about [specific thing]." This takes judgment to do well — AI can do a credible version in seconds.</p>
`,
    demoTitle: 'Voice preserved vs. voice lost',
    demo: `
<p>Same prompt, two approaches:</p>

<p><strong>Voice-lost approach:</strong> "Write a LinkedIn post about the importance of AI fluency in the workplace."</p>
<p>Result: "In today's rapidly evolving digital landscape, AI fluency has become an essential skill for modern professionals. Organizations that embrace AI-driven transformation are better positioned to leverage competitive advantages..." — forgettable, generic, indistinguishable from ten thousand other posts.</p>

<p><strong>Voice-preserved approach:</strong> "Here are three of my previous LinkedIn posts: [paste examples]. Match this voice exactly. Write a post about AI fluency at work. Take a specific, opinionated position rather than hedging. Start with a specific observation, not a general statement. Under 200 words. Do not use: leverage, evolving landscape, digital transformation, essential skills."</p>
<p>Result: Something that sounds like a specific person with a specific perspective, starting with a concrete observation, making a real argument. Shareable. Memorable.</p>
`,
    exercise: {
      title: 'Build your personal voice calibration prompt',
      prompt: `This exercise produces something you'll use permanently: a voice calibration prompt you can apply to any AI writing task.

Step 1: Find 3-4 pieces of your own writing that you're proud of — emails, documents, posts, anything.

Step 2: Ask Claude or ChatGPT: "Read these examples of my writing. What are five words or phrases I use frequently? What is the rhythm of my sentences (long/short, varied/consistent)? What position do I take — direct or hedged? What vocabulary do I avoid?"

Step 3: Read the AI's analysis. What did it get right? Edit it until it's accurate.

Step 4: Build your calibration prompt: "Write in [your name]'s voice. Characteristics: [paste the accurate description]. Never use: [your anti-vocabulary list]."

Test it on a real writing task. Compare to your unassisted writing. Edit until the gap is small.`,
      hint: "The calibration prompt is worth 30 minutes to build properly. You'll use it for years.",
      tools: ['Claude', 'ChatGPT'],
    },
    recall: [
      {
        q: "What are the four layers of the voice preservation system? Why is editing as the final step non-optional?",
        hint: "Sample injection, anti-vocabulary, position clarity, editing — what does each layer do that the previous layers can't?",
      },
      {
        q: "What is the output multiplier framework? How does it differ from asking AI to write content from scratch?",
        hint: "Think about where the original thinking comes from and what AI's role is in the framework.",
      },
    ],
    reflection: `What is the gap between your best unassisted writing and your typical AI-assisted writing? Which of the four voice preservation layers would close that gap the most?`,
    keyTakeaway: "Pro AI writing preserves your voice through sample injection, anti-vocabulary lists, position clarity, and aggressive editing. The multiplier framework: one strong original insight, AI-adapted into multiple formats, each edited. Core thinking is always yours.",
  },

  {
    module: 7,
    slug: 'data-analysis-and-ai',
    tier: 5,
    tierLabel: 'Tier 5 — Workflow Integration',
    title: 'Data Analysis & AI',
    subtitle: "Turn raw data into clear narratives. AI-assisted analysis for non-data scientists.",
    duration: '11 min',
    hook: `Data analysis used to require either statistical expertise or a data analyst on your team. AI changes this substantially — not by replacing analysts, but by making analysis accessible to anyone who can ask good questions and evaluate answers critically. This module covers how to use AI for the analysis tasks that previously needed specialist help, and where the limits are.`,
    concept: `
<h2>What AI Can Do With Data</h2>

<p>When you provide data directly (paste a table, upload a file, share a CSV), AI can:</p>
<ul>
  <li>Summarize patterns and distributions ("what are the main patterns in this dataset?")</li>
  <li>Calculate descriptive statistics if the dataset is small enough to fit in context</li>
  <li>Identify outliers and anomalies</li>
  <li>Suggest appropriate analysis approaches for your question</li>
  <li>Write code (Python, R, SQL) to perform analysis you then run yourself</li>
  <li>Translate data findings into plain-language narratives</li>
  <li>Generate visualizations descriptions or chart specifications</li>
</ul>

<h2>The Right Mental Model: AI as Analysis Partner</h2>

<p>The most effective AI data analysis workflow treats AI as a thinking partner, not an automatic analyst. You:</p>
<ol>
  <li>Know the business question</li>
  <li>Understand the limitations of your data</li>
  <li>Evaluate whether AI's analysis makes sense</li>
</ol>

<p>AI handles:</p>
<ol>
  <li>Suggesting analysis approaches you might not have thought of</li>
  <li>Writing the code or queries</li>
  <li>Translating results into narrative</li>
  <li>Identifying what additional data would strengthen the analysis</li>
</ol>

<h2>High-Value Data Analysis Prompts</h2>

<p><strong>Pattern identification:</strong> "Here is [dataset]. What are the three most interesting patterns? For each pattern, tell me what additional context would help determine if it's meaningful."</p>

<p><strong>Narrative generation:</strong> "Here are the key findings from my analysis: [list]. Write a clear narrative explanation for a non-technical audience. Start with the most important finding."</p>

<p><strong>Code generation:</strong> "I have a CSV with columns [list]. I want to [analysis goal]. Write Python/SQL code to do this analysis. Include comments explaining what each section does."</p>

<p><strong>Chart specification:</strong> "Given this data and this audience, what type of visualization would communicate the key finding most clearly? Why?"</p>

<h2>The Critical Limits</h2>

<p>AI cannot access data you don't provide. It cannot run analysis on large datasets without a code interpreter. It can make arithmetic errors on mental math. It cannot tell you whether your data is actually measuring what you think it's measuring — that domain judgment is yours.</p>
`,
    demoTitle: 'From raw numbers to clear narrative',
    demo: `
<p>Task: a spreadsheet of customer survey results needs to become an executive-ready summary.</p>
<p>Typical path: export, manually calculate averages, write up findings by hand.</p>
<p>AI-assisted path: paste the data (or key summaries if too large), ask "What are the three most significant patterns in this data? For each, what is the confidence level based on sample size, and what's the most important caveat a decision-maker should know?" Then ask: "Write a one-paragraph executive summary of these findings. Lead with the most actionable insight."</p>
<p>Result: a grounded, narrative summary in minutes rather than hours — with explicit uncertainty flagged rather than buried.</p>
`,
    exercise: {
      title: 'Analyze a real dataset with AI assistance',
      prompt: `Find a dataset from your work — survey results, sales figures, project metrics, anything with numbers in rows and columns.

Run this analysis sequence:
1. Paste the data (or a representative sample) and ask: "What patterns do you see?"
2. Ask: "What additional context would help determine if these patterns are meaningful?"
3. Ask: "Write a plain-language summary of the most important finding for someone who doesn't work with data."
4. Verify: check at least two specific claims AI made against the raw data.

What did AI surface that you wouldn't have noticed immediately? What did it get wrong or oversimplify?`,
      hint: "Always verify specific numerical claims against the source data. AI can misread tables or make arithmetic errors.",
      tools: ['Claude', 'ChatGPT with Code Interpreter', 'Gemini'],
    },
    recall: [
      {
        q: "What is the 'analysis partner' mental model for AI data work? What does each party contribute?",
        hint: "Think about what requires business context and judgment versus what is pattern recognition and code generation.",
      },
      {
        q: "Name three high-value AI data analysis tasks and one important limit you should always keep in mind.",
        hint: "Pattern identification, narrative generation, code generation — and the limit around what data AI can actually access.",
      },
    ],
    reflection: `Where in your work are you currently producing data analysis manually that AI could assist with? What would the workflow look like?`,
    keyTakeaway: "AI is a capable analysis partner when you provide the data and evaluate the outputs. It generates patterns, narratives, and code — you provide the business question and domain judgment. Always verify specific numerical claims against source data.",
  },

  {
    module: 8,
    slug: 'ai-in-your-tech-stack',
    tier: 5,
    tierLabel: 'Tier 5 — Workflow Integration',
    title: 'AI in Your Tech Stack',
    subtitle: "Integrations, automation, and how to connect AI to the tools you already use.",
    duration: '11 min',
    hook: `The most powerful AI implementations aren't standalone chat sessions — they're AI integrated into the tools and workflows where work actually happens. This module covers the integration landscape: how to connect AI to your existing tools without writing code, where integrations add the most value, and how to evaluate which connections are worth building.`,
    concept: `
<h2>The Integration Landscape</h2>

<p>AI integrates with your existing tools in three ways:</p>

<p><strong>1. Native AI features:</strong> AI built directly into tools you already use. Microsoft Copilot in Word/Excel/Teams. Google AI in Docs/Gmail/Sheets. Notion AI. Slack AI. These require no setup — they're already there.</p>

<p><strong>2. No-code automation:</strong> Tools like Zapier, Make (formerly Integromat), and n8n connect AI to your workflows through visual, no-code interfaces. Trigger an AI action when something happens in another tool (new email → AI summary in Slack; new data row → AI-generated report).</p>

<p><strong>3. API integration:</strong> Connecting to AI models directly via API for custom applications. Requires some technical ability, but enables highly customized workflows. Not covered in this module — this is Tier 7 territory.</p>

<h2>Where Integration Adds the Most Value</h2>

<p>The highest-value AI integrations share three characteristics: they involve repetitive information processing, the information lives in specific tools, and the output goes to a specific place. Examples:</p>

<ul>
  <li>New support ticket → AI categorizes and drafts response → human reviews before sending</li>
  <li>New meeting recording → AI generates summary + action items → posted to project channel</li>
  <li>New form submission → AI extracts key information → creates structured record</li>
  <li>New document added to folder → AI generates summary → added to knowledge base</li>
  <li>Weekly data export → AI generates narrative update → sent to stakeholders</li>
</ul>

<h2>Evaluating Integration Opportunities</h2>

<p>Before building an integration, answer:</p>
<ol>
  <li>How often does this trigger occur? (Daily vs. once a month changes the ROI calculation completely)</li>
  <li>How much time does the current manual process take?</li>
  <li>What are the consequences of AI getting this wrong? (Low stakes: automate. High stakes: always keep a human in the loop)</li>
  <li>Is the output going directly to external parties, or to a human who reviews first?</li>
</ol>

<h2>Starting With Native Features</h2>

<p>Before building any automation, exhaust what's already available. Most people significantly underuse native AI features in tools they already pay for.</p>

<p>Audit: what AI features exist in your current toolkit? (Check Settings or the Help docs for Microsoft 365, Google Workspace, Notion, Slack, etc.) Try the ones you haven't used yet before investing time in building integrations.</p>
`,
    demoTitle: 'A simple automation in practice',
    demo: `
<p>A Zapier automation example that takes 20 minutes to build:</p>
<p><strong>Trigger:</strong> New row added to Google Sheet (incoming leads or requests)</p>
<p><strong>Step 1:</strong> Send the row data to ChatGPT with a prompt: "Given this lead information, write a personalized first-touch email. Tone: warm and direct. Include a specific observation based on their information. Under 150 words."</p>
<p><strong>Step 2:</strong> Save the AI-generated draft to a Google Doc for review</p>
<p><strong>Step 3:</strong> Send a Slack notification: "New lead email draft ready for review: [link]"</p>
<p>The human reviews and sends. The AI handles the draft generation. Total human time per lead: 2 minutes instead of 10.</p>
`,
    exercise: {
      title: 'Audit and implement one native AI feature',
      prompt: `Part 1 — Audit:
List the tools you use most frequently at work. For each, spend 2 minutes checking what AI features are available. (Tip: search "[tool name] AI features 2025" if you're unsure.)

Part 2 — Implement:
Choose one native AI feature you haven't used yet that looks useful. Use it for a real task this week. Evaluate: did it save time? Did it produce useful output? What would you change about how you used it?

Part 3 — Identify one automation opportunity:
Based on the integration criteria from this module (repetitive, information in a specific tool, output goes to a specific place) — what one workflow in your work would benefit from automation? You don't have to build it yet; just identify and describe it.`,
      hint: "Most people have AI features sitting unused in tools they already pay for. Audit first, build later.",
      tools: ['Zapier', 'Make', 'Microsoft Copilot', 'Google Workspace AI', 'Notion AI'],
    },
    recall: [
      {
        q: "What are the three ways AI integrates with existing tools? What distinguishes each from the others?",
        hint: "Native features, no-code automation, API integration — what capability and setup does each require?",
      },
      {
        q: "What four questions should you answer before building an AI integration?",
        hint: "Think about frequency, time saved, consequence of errors, and whether the output bypasses human review.",
      },
    ],
    reflection: `What one AI integration would have the biggest impact on your daily work if it existed? What would it take to build it?`,
    keyTakeaway: "The highest-value AI integrations are repetitive, tool-specific, and clearly defined. Before building anything, exhaust native AI features you already have access to. Apply the four evaluation criteria before investing time in any automation.",
  },

  {
    module: 9,
    slug: 'managing-ai-quality',
    tier: 5,
    tierLabel: 'Tier 5 — Workflow Integration',
    title: 'Managing AI Quality',
    subtitle: "Review processes, error patterns, and building quality checks into your workflow.",
    duration: '11 min',
    hook: `As AI gets integrated into more workflows, quality management becomes a distinct discipline. It's not enough to spot-check individual outputs — you need systematic approaches that scale with your AI use. This module covers the error patterns that recur most in AI-assisted work and how to build quality checks that catch them without creating bottlenecks.`,
    concept: `
<h2>The AI Error Taxonomy</h2>

<p>AI errors are not random — they cluster into predictable patterns. Knowing the pattern predicts where to look:</p>

<p><strong>Factual hallucination:</strong> Confident false statements about facts, statistics, citations, people, and events. Most common in knowledge-recall tasks without provided source material. Detection: verify specific claims against primary sources.</p>

<p><strong>Instruction drift:</strong> The output drifts from the original instruction — usually a change in length, format, tone, or scope. Most common in long or multi-part prompts. Detection: compare output to your stated requirements.</p>

<p><strong>Plausible fabrication:</strong> Technically false but plausible-sounding claims — the most dangerous type because they pass casual review. Most common when AI is asked about specific organizations, people, or niche topics. Detection: ask "what's your source?" for any specific claim.</p>

<p><strong>Context loss:</strong> AI ignores or misapplies context you provided. Most common in long conversations where the context is far from the current prompt. Detection: re-read AI's output with your context in mind and check for obvious mismatches.</p>

<p><strong>Over-hedging:</strong> Output is so qualified and balanced it's not actually useful. Most common for sensitive or complex topics. Detection: read for actionability — can you actually do something with this?</p>

<h2>Building Quality Checks Into Workflows</h2>

<p>The goal is not to manually verify everything — that defeats the purpose of AI assistance. The goal is calibrated verification: systematic checks at the right moments for the right types of errors.</p>

<p><strong>Checkpoint design:</strong></p>
<ul>
  <li>Identify which error types are most likely for each AI task in your workflow</li>
  <li>Build a specific check for each: "Before sending, verify any statistics in this email against their original source"</li>
  <li>Document the checks as part of the workflow (not in your head)</li>
</ul>

<p><strong>High-stakes vs. low-stakes differentiation:</strong> Not all AI outputs need the same scrutiny. Client-facing and decision-informing outputs need rigorous review. Internal working documents can tolerate more roughness. Calibrate your review intensity to the stakes.</p>

<h2>The Pre-Send Checklist</h2>

<p>For any AI-assisted output going to an external audience:</p>
<ol>
  <li>Are there any specific factual claims? If yes, are they verified?</li>
  <li>Does this match the tone and voice appropriate for this recipient?</li>
  <li>Is there anything in here that would be embarrassing if it were wrong?</li>
  <li>Does this actually answer what was asked?</li>
  <li>Would I be comfortable with my name on this exactly as it is?</li>
</ol>
`,
    demoTitle: 'Catching instruction drift',
    demo: `
<p>Instruction drift is the most common quality failure in AI-assisted work — and the easiest to miss because the output looks fine until you compare it to the original requirement.</p>

<p>Example: You asked for a 200-word summary. You got 350 words. You asked for three bullet points. You got five. You asked for a formal tone. The opening paragraph is casual.</p>

<p>The systematic catch: after any AI response, spend 30 seconds checking it against your prompt requirements the same way a copy editor checks against a brief. This takes practice to make habitual but becomes fast.</p>
`,
    exercise: {
      title: 'Build a quality checklist for your most common AI task',
      prompt: `Identify your most frequent AI-assisted workflow — the task you run most often with AI help.

Build a quality checklist for it:
1. What type of AI errors are most likely in this task? (Use the error taxonomy)
2. For each error type: what specific check would catch it?
3. At what point in the workflow should each check happen?
4. What are the consequences of each error type reaching the output?

Format this as a checklist you'd actually use: brief, specific, scannable.

Then: use it on your next three instances of this task. After three uses, revise based on what you actually caught versus what you didn't.`,
      hint: "A checklist with 3 specific checks is more useful than a thorough checklist with 10 vague ones.",
      tools: ['Claude', 'ChatGPT', 'Notion', 'Any checklist tool'],
    },
    recall: [
      {
        q: "Name and describe the five AI error types. Which is the most dangerous, and why?",
        hint: "Think about which error type is hardest to catch on casual review — and what makes it hard.",
      },
      {
        q: "Why shouldn't you verify everything, and how do you decide what to verify?",
        hint: "Think about calibrated verification: what factors determine which outputs need rigorous review?",
      },
    ],
    reflection: `In your current AI-assisted work, which error type are you most likely to miss? What one checkpoint would most improve your quality control?`,
    keyTakeaway: "AI errors cluster into five predictable patterns: hallucination, instruction drift, plausible fabrication, context loss, over-hedging. Build specific checks for each pattern. Calibrate review intensity to stakes. A 5-question pre-send checklist catches most quality failures.",
  },

  {
    module: 10,
    slug: 'team-ai-adoption',
    tier: 5,
    tierLabel: 'Tier 5 — Workflow Integration',
    title: 'Team AI Adoption',
    subtitle: "Getting your immediate team using AI effectively — without mandates or resistance.",
    duration: '11 min',
    hook: `Team AI adoption fails in predictable ways: mandates without training, enthusiasm without follow-through, one enthusiast and eleven skeptics. The people who successfully introduce AI to their teams don't mandate or evangelize — they demonstrate value in context, lower the barrier to first use, and create the conditions where people want to try it. This module is about that approach.`,
    concept: `
<h2>Why Top-Down Mandates Fail</h2>

<p>"We're going to use AI for everything starting Monday" produces: compliance theater (people using AI to generate outputs they then delete), resistance (people who feel their professional judgment is being devalued), and surface adoption without genuine behavior change.</p>

<p>The reason: mandates skip the step where people experience the value themselves. Until someone has a moment of "this actually made my work better," they have no reason to change a workflow that already functions adequately.</p>

<h2>The Adjacent Possible Strategy</h2>

<p>The most effective team adoption approach starts with adjacent possible uses — AI applications that are close enough to current practice to feel safe, but different enough to demonstrate clear value.</p>

<p><strong>Characteristics of good first AI use cases for a team:</strong></p>
<ul>
  <li>Low stakes: mistakes don't matter much</li>
  <li>High frequency: the team does this often enough to build habit</li>
  <li>Visible time savings: the time benefit is obvious, not theoretical</li>
  <li>No replacement anxiety: it augments a skill the team has rather than replacing it</li>
</ul>

<p>Common good starting points: meeting summary generation, first drafts of routine communications, document summarization, research synthesis.</p>

<h2>The Demo Before Training Principle</h2>

<p>Show before you teach. The most effective way to introduce AI to a skeptical team member is to do it in front of them on a real task they care about. Not a prepared demo — a live, messy, real use case with their specific problem.</p>

<p>"Let me show you something. That briefing document you have to read before tomorrow's meeting — let me paste it in here and ask for the three things you actually need to know."</p>

<p>One good live demo is worth three training sessions.</p>

<h2>Building Team Infrastructure</h2>

<p>Once a few people are using AI effectively, infrastructure accelerates broader adoption:</p>

<ul>
  <li><strong>Shared prompt library:</strong> Prompts that work for your specific team's tasks, documented and accessible. Removes the "I don't know what to ask" barrier.</li>
  <li><strong>Wins channel:</strong> A Slack channel or equivalent where people share AI outputs they're proud of. Social proof matters — seeing peers succeed is more motivating than any training.</li>
  <li><strong>Office hours:</strong> A recurring 30-minute slot where the team AI champion answers questions. Lowers the barrier for people who are curious but not confident enough to experiment alone.</li>
  <li><strong>Norms documentation:</strong> Clear guidelines on what data is safe to share with AI tools, and what requires review before external use.</li>
</ul>
`,
    demoTitle: 'The live demo in practice',
    demo: `
<p>A real team adoption story:</p>
<p>A communications manager spent 2 hours each week summarizing industry news for her team. She started doing it with AI instead — 15 minutes. She didn't mandate anything. She just mentioned it in a team meeting and offered to show anyone who was interested.</p>
<p>Three people asked for a live demo. She showed them in 10 minutes, live, on their actual news sources. Within a month, all five team members were doing their own AI-assisted research synthesis. No training program, no mandate. Just a visible time saving and one good live demo.</p>
`,
    exercise: {
      title: 'Plan one team adoption move',
      prompt: `Think about your immediate team (or a team you work closely with).

Answer:
1. What is the one task that would produce the most visible time saving if the team used AI for it?
2. Who on the team is most likely to be open to trying it?
3. What would a live demo of this task look like? What would you show them, using a real task?

Then: execute one of these in the next week. Either do the live demo for one interested person, or share one AI output you're proud of and explain how you made it.

Note what happens. Did they ask questions? Did they want to try it themselves?`,
      hint: "One person is enough to start. Team adoption is peer-to-peer, not top-down.",
      tools: ['Claude', 'ChatGPT', 'Slack', 'Notion'],
    },
    recall: [
      {
        q: "Why do top-down AI adoption mandates fail? What step do they skip?",
        hint: "Think about what needs to happen before behavior change becomes voluntary rather than compliance.",
      },
      {
        q: "What makes a good first AI use case for a team? Name the four characteristics.",
        hint: "Low stakes, high frequency, visible time savings, no replacement anxiety — why does each one matter?",
      },
    ],
    reflection: `Who on your team is most likely to become a genuine AI practitioner if given the right introduction? What one task would make the strongest case for AI to that specific person?`,
    keyTakeaway: "Team adoption is peer-to-peer, not top-down. Find adjacent possible use cases, demo on real tasks live rather than in controlled presentations, and build lightweight infrastructure (shared prompts, wins channel, norms) once momentum exists.",
  },

  {
    module: 11,
    slug: 'measuring-ai-impact',
    tier: 5,
    tierLabel: 'Tier 5 — Workflow Integration',
    title: 'Measuring AI Impact',
    subtitle: "How to know if AI is actually making a difference. Metrics that matter.",
    duration: '10 min',
    hook: `"AI is saving us so much time" is not a metric. It's a feeling. The difference matters when you're deciding whether to invest more in AI tools, making the case to leadership, or figuring out which of your AI workflows are actually worth keeping. This module is about how to measure AI impact in ways that are both accurate and credible.`,
    concept: `
<h2>The Measurement Challenge</h2>

<p>AI impact is genuinely hard to measure because: the counterfactual (what would have happened without AI?) is never directly observable; quality improvements are harder to quantify than time savings; and the benefits often compound in ways that make attribution difficult.</p>

<p>This doesn't mean you can't measure — it means you need to be clear about what you're measuring and honest about uncertainty.</p>

<h2>The Three-Metric Framework</h2>

<h3>1. Time displacement</h3>
<p>The most straightforward metric: how long did this take with AI versus how long it would have taken without? Time this directly for a week on your key AI-assisted tasks. The result: "AI saves me X hours per week on [task category]."</p>

<p>Caveat: time displacement underestimates AI's value when quality also improves, and overestimates it when you spend the saved time inefficiently.</p>

<h3>2. Output quality</h3>
<p>Harder to measure, but often more important. Metrics for output quality vary by task: open rate for emails, pass rate for first drafts (how often does the client/manager approve it without major revision?), number of follow-up questions for communications (fewer = clearer), error rate in analyses.</p>

<h3>3. Coverage expansion</h3>
<p>Tasks you can now do that you couldn't before due to capacity constraints. This is often the highest-value category and the hardest to measure — it's the research you now do for every proposal because AI made it feasible, the personalization you can now do at scale, the documentation you actually write now because AI removed the friction.</p>

<h2>Making the Case</h2>

<p>For leadership or clients, translate metrics into business terms:</p>
<ul>
  <li>"I produce X deliverables per week instead of Y" (output throughput)</li>
  <li>"First-draft acceptance rate improved from X% to Y%" (quality)</li>
  <li>"We now [do something we couldn't do before] for every [client/project]" (coverage)</li>
  <li>"This workflow takes X minutes instead of Y hours" (specific process improvement)</li>
</ul>

<p>Numbers that connect to business outcomes (revenue, client satisfaction, capacity) are more compelling than time savings alone.</p>
`,
    demoTitle: 'A simple measurement approach',
    demo: `
<p>Pick one AI-assisted workflow you run at least weekly. For two weeks:</p>
<p>Week 1: Do it without AI, and time it.</p>
<p>Week 2: Do it with AI, and time it.</p>
<p>Also note: did the quality differ? Did you have to do any rework?</p>
<p>The result is a specific, credible data point: "Writing my weekly status update takes 45 minutes without AI and 12 minutes with AI. The quality is comparable — my manager hasn't asked for revisions more often in either week."</p>
<p>Repeat for 3-4 workflows and you have a credible picture of your AI impact.</p>
`,
    exercise: {
      title: 'Design a one-month AI impact measurement',
      prompt: `Choose 2-3 AI-assisted workflows you run regularly. For each one, define:

1. What is the time displacement metric? (How will you measure time with vs. without?)
2. What is the quality metric? (What signals tell you the output is better or worse?)
3. Is there a coverage expansion? (Is there something you now do that you couldn't before?)

Then: for one week, track these metrics. At the end of the week, calculate: what is the total weekly time displacement across your measured workflows?

Turn this into one sentence you could share with a manager: "AI saves me approximately X hours per week on [task categories], which I'm redirecting to [higher-value work]."`,
      hint: "Approximate is fine. A rough measurement done consistently beats a precise measurement done once.",
      tools: ['Any spreadsheet', 'Notion', 'Paper'],
    },
    recall: [
      {
        q: "What are the three metrics in the AI impact framework? Why is coverage expansion often the most valuable but hardest to measure?",
        hint: "Think about what 'tasks you couldn't do before' means in terms of business value — and why it's hard to put a number on it.",
      },
      {
        q: "How would you translate your AI time savings into a business case for a skeptical manager?",
        hint: "Time savings alone are rarely compelling. What connects time to business outcomes?",
      },
    ],
    reflection: `If you had to present your AI impact in one slide to your manager or client right now, what would you say? What data do you have? What data do you wish you had?`,
    keyTakeaway: "Measure AI impact across three dimensions: time displacement, output quality, and coverage expansion. Translate to business terms, not just hours. Track consistently rather than precisely. Coverage expansion is often the highest-value impact and the most underreported.",
  },

  {
    module: 12,
    slug: 'ai-for-creativity-and-ideation',
    tier: 5,
    tierLabel: 'Tier 5 — Workflow Integration',
    title: 'AI for Creativity & Ideation',
    subtitle: "Brainstorming, concept development, and using AI as a thinking partner.",
    duration: '10 min',
    hook: `Creative blocks are expensive. Waiting for inspiration is slow. AI changes the economics of ideation: it eliminates blank-page paralysis and produces a volume of starting points that manual brainstorming rarely matches. The constraint is that AI generates plausible-sounding ideas more reliably than genuinely novel ones. This module is about getting the volume and using your judgment to find the signal.`,
    concept: `
<h2>What AI Does and Doesn't Do for Creativity</h2>

<p>AI is excellent at: generating large volumes of options quickly, combining concepts in ways that surface non-obvious connections, exploring variations on a theme, thinking from a different perspective than your default, and getting past blank-page paralysis.</p>

<p>AI is not excellent at: generating truly original ideas (it recombines what exists), judging which ideas are actually good, and providing the domain judgment to know what's feasible.</p>

<p>The creative workflow where AI adds the most value: you bring domain knowledge and quality judgment; AI brings volume and variation.</p>

<h2>The Diverge-Converge Pattern</h2>

<p>The most effective AI-assisted creative workflow has two phases:</p>

<p><strong>Diverge:</strong> Generate as many options as possible without judgment. Ask AI for 20 options, not 5. Ask for ideas from a different perspective, a different industry, a different constraint. Remove the word "good" from your prompt — just generate.</p>

<p><strong>Converge:</strong> Apply your judgment to the full set. Which ideas are genuinely interesting? Which are plausible-but-boring? Which combine to make something better? Human judgment drives convergence. AI can help by steelmanning your selected ideas or identifying weaknesses.</p>

<h2>Ideation Prompt Patterns</h2>

<p><strong>Volume generation:</strong> "Give me 20 [ideas/angles/approaches] for [problem/task]. Don't filter for quality — I want quantity."</p>

<p><strong>Perspective shift:</strong> "How would [a different industry/a 5-year-old/a skeptic/someone in 1990] approach this problem?"</p>

<p><strong>Constraint injection:</strong> "Generate solutions to [problem] with this constraint: [unusual constraint]. The constraint is non-negotiable."</p>

<p><strong>Combination:</strong> "Here are two ideas I like: [A] and [B]. Generate 10 variations that combine elements of both."</p>

<p><strong>What if:</strong> "What if [assumption about this problem] were false? What would change about the approach?"</p>

<h2>Keeping the Human in the Loop</h2>

<p>The failure mode: accepting AI's first interesting-sounding idea without applying domain judgment. AI generates ideas that sound creative and are actually generic — they just use unusual vocabulary to describe common approaches.</p>

<p>The discipline: evaluate every AI-generated idea against your domain expertise. "Is this actually novel in my field? Has this been tried? What would make it actually work?"</p>
`,
    demoTitle: 'Volume over curation',
    demo: `
<p>A product team is naming a new feature. Manual brainstorm: 8-12 names in 30 minutes, heavily influenced by what the first person says.</p>
<p>AI-assisted: "Give me 40 possible names for a feature that [description]. Include: 5 that are purely descriptive, 5 that are metaphorical, 5 that reference the benefit, 5 that are short enough to be a keyboard shortcut, and 15 in whatever style feels most interesting to you."</p>
<p>Result: 40 names in 90 seconds. Most are forgettable. Three are interesting. One combination of two names becomes the actual choice.</p>
<p>The creative breakthrough came from volume that made an unexpected combination visible — not from AI being creative, but from AI generating enough that human pattern recognition could find something good.</p>
`,
    exercise: {
      title: 'Run a diverge-converge session on a real creative problem',
      prompt: `Choose a real creative challenge you're working on — a name, a concept, a problem to solve, a campaign idea.

Diverge:
1. Ask AI for 25 ideas (no quality filter)
2. Ask for 10 more from a completely different angle or industry
3. Ask for 10 that violate your first assumption about the problem

Converge:
4. Without re-reading AI's list, write your own 5 favorite ideas
5. Now read the AI list: what surprised you? What did you miss?
6. Pick 3 AI ideas and 2 of your own and ask AI to combine them

Final: what came out of the session that you wouldn't have reached without it?`,
      hint: "The goal of diverge is volume, not quality. Suspend judgment until converge. This is the discipline that makes the process work.",
      tools: ['Claude', 'ChatGPT'],
    },
    recall: [
      {
        q: "What does AI do well in creative work, and what does it do poorly? How does understanding this change how you use it for ideation?",
        hint: "Volume and variation versus genuine novelty and quality judgment — which side does AI belong on?",
      },
      {
        q: "Describe the diverge-converge pattern. What is the risk if you skip the diverge phase and ask for 'the best 3 ideas' immediately?",
        hint: "Think about what 'best' means without volume to compare against — and what AI defaults to when asked to filter.",
      },
    ],
    reflection: `Where in your work do you most often feel creatively stuck or limited by blank-page paralysis? How would you apply the diverge-converge pattern to that specific situation?`,
    keyTakeaway: "AI adds creative value through volume and variation, not novelty. Separate diverge (quantity, no judgment) from converge (quality, your judgment). Ask for more options than you think you need. The valuable idea is often in the combination, not the original generation.",
  },

  {
    module: 13,
    slug: 'building-with-no-code-ai',
    tier: 5,
    tierLabel: 'Tier 5 — Workflow Integration',
    title: 'Building with No-Code AI',
    subtitle: "Automate, create, and solve with AI tools that don't require programming.",
    duration: '11 min',
    hook: `A significant category of AI-powered solutions is now buildable without writing a line of code. Custom chatbots, automated document processors, AI-augmented forms, personalized content engines — these used to require developers. They no longer do. This module covers the no-code AI landscape and how to identify which type of tool is right for your use case.`,
    concept: `
<h2>The No-Code AI Landscape</h2>

<p><strong>Automation platforms with AI steps:</strong> Zapier, Make (Integromat), n8n. Connect AI to your existing tools via visual workflows. Best for: processing incoming information, generating outputs that go somewhere else, recurring triggered tasks.</p>

<p><strong>Custom AI assistant builders:</strong> ChatGPT Custom GPTs, Claude Projects (with custom instructions), Botpress, Voiceflow. Create specialized AI assistants with custom knowledge, specific personas, and constrained behaviors. Best for: customer-facing Q&A, internal knowledge assistants, team-specific use cases.</p>

<p><strong>AI-enhanced form and data tools:</strong> Typeform AI, Fillout, Glide. Forms that adapt based on responses, extract structured data from unstructured input, generate summaries from form data. Best for: intake processes, surveys, data capture workflows.</p>

<p><strong>Document and content platforms:</strong> Notion AI, Coda AI, Gamma, Beautiful.ai. AI integrated into document and presentation creation. Best for: knowledge management, document generation, presentation creation.</p>

<h2>Identifying Your Build vs. Buy Decision</h2>

<p>Before building anything, answer:</p>
<ol>
  <li>Does this already exist as a native feature in a tool I use?</li>
  <li>Is there an off-the-shelf AI tool that solves this?</li>
  <li>Does this require custom configuration (system prompt, knowledge base, specific connections)?</li>
  <li>Does this require custom code (API calls, data transformations, complex logic)?</li>
</ol>

<p>Build only when the answer to 3 is yes and 4 is no. If 4 is yes, assess whether the complexity justifies a developer or whether a simpler solution serves 80% of the need.</p>

<h2>Building a Custom AI Assistant (No Code)</h2>

<p>The simplest no-code build: a custom GPT or Claude Project configured for a specific use case.</p>

<p><strong>What it takes:</strong></p>
<ul>
  <li>A clear system prompt defining the assistant's role, knowledge, and constraints</li>
  <li>Optional: uploaded knowledge documents (the assistant answers from these)</li>
  <li>Optional: a specific persona or communication style</li>
</ul>

<p><strong>Practical use cases:</strong> Team onboarding assistant that knows your internal processes, customer FAQ bot, personal research assistant configured with your domain expertise, writing assistant with your brand voice built in.</p>
`,
    demoTitle: 'A custom assistant in 10 minutes',
    demo: `
<p>Building a custom AI assistant for a specific team task:</p>
<ol>
  <li>Open ChatGPT → Explore GPTs → Create, or Claude → New Project → Set instructions</li>
  <li>Write a system prompt: "You are an onboarding assistant for [Company]. You help new team members understand [specific processes]. You answer questions clearly and directly. If you don't know something, say so and direct them to [person/resource]."</li>
  <li>Upload relevant documents: process guides, FAQs, style guides</li>
  <li>Test it with real questions a new team member would ask</li>
  <li>Iterate on the system prompt based on where it falls short</li>
</ol>
<p>Total time: 20-45 minutes. Result: a specialized assistant that knows your context and follows your constraints.</p>
`,
    exercise: {
      title: 'Build one no-code AI tool',
      prompt: `Identify a use case in your work that would benefit from a custom AI assistant or automated AI workflow. Good candidates: frequently asked questions, recurring content generation, document processing.

Build it:
- For an assistant: create a custom GPT or Claude Project with a system prompt and at least one uploaded document
- For an automation: set up one Zapier or Make workflow with an AI step

Test it with real inputs. What works? What needs refinement?

Document what you built, what it does, and who else on your team could use it.`,
      hint: "Start with the simplest version that solves 80% of the problem. You can add complexity later.",
      tools: ['ChatGPT Custom GPTs', 'Claude Projects', 'Zapier', 'Make'],
    },
    recall: [
      {
        q: "Name four categories of no-code AI tools and give one use case for each.",
        hint: "Automation platforms, custom assistant builders, AI-enhanced forms, document platforms — what does each enable?",
      },
      {
        q: "What four questions help you decide whether to build, buy, or use a native feature?",
        hint: "Think about the decision ladder from 'already exists' to 'needs custom code'.",
      },
    ],
    reflection: `What one AI tool could you build in the next week that would make a real difference to your team? What's the minimum viable version?`,
    keyTakeaway: "No-code AI tools make custom solutions accessible without programming. The build decision: use native features first, off-the-shelf second, no-code build third, custom code only when necessary. Start with the simplest version that solves 80% of the need.",
  },

  {
    module: 14,
    slug: 'workflow-automation-deep-dive',
    tier: 5,
    tierLabel: 'Tier 5 — Workflow Integration',
    title: 'Workflow Automation Deep Dive',
    subtitle: "Zapier, Make, n8n — connecting AI to your business processes without developers.",
    duration: '12 min',
    hook: `Automation platforms turn one-off AI prompts into persistent, triggered workflows. The difference is significant: instead of manually asking AI to process each new input, you build the workflow once and it runs automatically. This module goes deeper into automation design — how to structure reliable workflows, where they break, and how to build in the safety nets that keep them trustworthy.`,
    concept: `
<h2>Automation Architecture Basics</h2>

<p>Every automation workflow has the same structure:</p>
<ul>
  <li><strong>Trigger:</strong> The event that starts the workflow (new email, new row, scheduled time, form submission, webhook)</li>
  <li><strong>Actions:</strong> The steps that happen in response (get data, transform with AI, send output)</li>
  <li><strong>Output:</strong> Where the result goes (saved document, sent message, updated record, notification)</li>
</ul>

<p>AI typically appears in the action layer: a step that sends input to an AI model with a specific prompt and receives an output that the rest of the workflow uses.</p>

<h2>Designing Reliable AI Automation Steps</h2>

<p>The most common automation failure: the AI output isn't what downstream steps expect. Prevention:</p>

<p><strong>Specify output format precisely:</strong> In your AI prompt, tell the model exactly what format the output should be in. If the next step expects a JSON object, say so. If it expects a plain summary, say "plain text, no markdown." Inconsistent formatting breaks downstream steps.</p>

<p><strong>Handle edge cases:</strong> What happens when the input is empty? Too long? In the wrong language? Test these explicitly and build handling steps.</p>

<p><strong>Add a human-in-the-loop gate for high stakes:</strong> Before any AI-generated content goes directly to an external party, consider adding a notification step that pauses for human review. A Slack message saying "New AI-generated email ready for review: [link to approve/reject]" adds minutes to the process but prevents embarrassing errors.</p>

<h2>Platform Comparison</h2>

<p><strong>Zapier:</strong> Most integrations (6,000+), easiest to use, most expensive at scale. Best for: getting started, broad tool coverage, non-technical users.</p>

<p><strong>Make (Integromat):</strong> More powerful data transformation, visual and intuitive, better value at scale. Best for: more complex workflows, when Zapier's limitations become constraints.</p>

<p><strong>n8n:</strong> Open source, self-hostable, most powerful and most complex. Best for: technical teams, data privacy requirements, advanced custom logic.</p>

<h2>Monitoring and Maintenance</h2>

<p>Automations break. AI models update and behavior changes. APIs deprecate. Data formats shift. Build monitoring in from the start:</p>
<ul>
  <li>Set up error notifications so you know when a workflow fails rather than discovering it a week later</li>
  <li>Review AI-generated outputs spot-check weekly for the first month after launch</li>
  <li>Schedule a quarterly review of all active automations</li>
</ul>
`,
    demoTitle: 'End-to-end automation design',
    demo: `
<p>A complete automation design for a recurring report:</p>
<p><strong>Trigger:</strong> Every Monday at 8am</p>
<p><strong>Step 1:</strong> Get last week's data from Google Sheets</p>
<p><strong>Step 2:</strong> Send to AI with prompt: "Summarize these metrics in a weekly update format. Include: the key metric changes from last week (provide numbers), one positive trend, one concern worth watching. Output as plain text, max 150 words."</p>
<p><strong>Step 3:</strong> Format the output with a standard header</p>
<p><strong>Step 4:</strong> Send to Slack #team-updates channel</p>
<p><strong>Step 5:</strong> Also email to distribution list</p>
<p>Result: a consistent weekly update generated and distributed with zero manual effort after setup.</p>
`,
    exercise: {
      title: 'Design and build one full automation',
      prompt: `Design a complete automation workflow for a recurring task. Use this design template:

1. Trigger: What event or schedule starts this workflow?
2. Input: What data does the AI step need?
3. AI prompt: Write the exact prompt the automation will use (include output format specification)
4. Output: Where does the result go and in what format?
5. Human gate: Is there a review step before external delivery? If not, why is it safe to skip?
6. Error handling: What notification will you set up if it fails?

Then build it in Zapier or Make. Run it 5 times with real data. Adjust the AI prompt based on output quality.`,
      hint: "The AI prompt in an automation needs to be more constrained than a manual prompt — it has to produce consistent, parseable output every time.",
      tools: ['Zapier', 'Make', 'n8n'],
    },
    recall: [
      {
        q: "What are the three components of every automation workflow? How does AI typically fit in?",
        hint: "Trigger, actions, output — and where in the action layer does AI typically appear?",
      },
      {
        q: "What is the most common automation failure involving AI, and how do you prevent it?",
        hint: "Think about what happens when AI output format is inconsistent and a downstream step expects a specific format.",
      },
    ],
    reflection: `What is the most time-consuming recurring process in your work? What would a complete automation design for it look like?`,
    keyTakeaway: "Automation design requires precise AI output format specification, explicit edge case handling, and monitoring from day one. Add human-in-the-loop gates for high-stakes external outputs. Start with Zapier, graduate to Make or n8n when complexity warrants it.",
  },

  {
    module: 15,
    slug: 'personal-ai-operating-system',
    tier: 6,
    tierLabel: 'Tier 6 — Critical Evaluation',
    title: 'Personal AI Operating System',
    subtitle: "Design your own system. How to run your work with AI as an integrated co-pilot.",
    duration: '12 min',
    hook: `Individual AI tools and workflows are useful. An integrated personal AI operating system is transformative. The difference: instead of reaching for AI when you remember it exists, you've designed a system where AI is the default for specific categories of work. This module is about designing that system — your personal stack, your documented workflows, your decision criteria for when to use what.`,
    concept: `
<h2>What a Personal AI OS Looks Like</h2>

<p>A personal AI operating system has four components:</p>

<ol>
  <li><strong>Your stack:</strong> The specific tools you use for specific task types — not every tool that exists, but the specific ones that work best for your work.</li>
  <li><strong>Your workflows:</strong> Documented, named processes for your most frequent AI-assisted tasks.</li>
  <li><strong>Your decision criteria:</strong> Clear rules for when to use AI versus when not to — based on task type, stakes, and time available.</li>
  <li><strong>Your prompt library:</strong> Proven prompts for recurring tasks, in a place you can find them.</li>
</ol>

<h2>Designing Your Stack</h2>

<p>Most practitioners end up using 3-5 tools regularly, with one primary conversational AI and specialized tools for specific use cases. Design criteria:</p>
<ul>
  <li>Which tasks make up 80% of my AI use?</li>
  <li>Which tool performs best for each task category?</li>
  <li>What are my data privacy requirements?</li>
  <li>What integrates with the tools my team uses?</li>
</ul>

<p>Document your stack as a simple decision table: "For [task type], I use [tool], because [reason]."</p>

<h2>The Decision Criteria Framework</h2>

<p>A personal AI OS includes explicit criteria for when AI is and isn't the right choice:</p>

<p><strong>Use AI by default:</strong> First drafts, research synthesis, structural analysis, generating options, format conversion, document summarization.</p>

<p><strong>Use AI with verification:</strong> Factual research, anything that will be used externally, analyses that inform decisions.</p>

<p><strong>Use AI for input only:</strong> Sensitive communications, high-stakes decisions, anything where your unique context is irreplaceable.</p>

<p><strong>Don't use AI:</strong> Situations where the thinking process itself is the value (building your own judgment), genuinely confidential information in non-approved tools, tasks where authenticity of voice is verified (some academic, some professional contexts).</p>

<h2>The Weekly AI Review</h2>

<p>The habit that keeps a personal AI OS healthy: a 15-minute weekly review.</p>
<ul>
  <li>What AI-assisted work am I most proud of this week? Why did it work?</li>
  <li>What AI output disappointed me? What would I change?</li>
  <li>Did I use AI for anything I shouldn't have? Or miss using it somewhere I should have?</li>
  <li>Is there a new prompt worth adding to my library?</li>
</ul>

<p>This review takes 15 minutes and produces the continuous improvement loop that separates compounding practitioners from stagnating users.</p>
`,
    demoTitle: 'A personal AI OS snapshot',
    demo: `
<p>An example stack for a marketing professional:</p>
<ul>
  <li><strong>Primary AI:</strong> Claude — complex writing, analysis, long documents</li>
  <li><strong>Search AI:</strong> Perplexity — current information, research with citations</li>
  <li><strong>Content AI:</strong> ChatGPT — image generation, varied content formats</li>
  <li><strong>Workspace AI:</strong> Notion AI — internal documents, meeting notes, knowledge base</li>
  <li><strong>Automation:</strong> Zapier — 3 recurring automations (weekly report, lead email drafts, content calendar)</li>
</ul>
<p>Prompt library: 22 entries across 5 categories. Decision criteria: documented on one page in Notion. Weekly review: Friday afternoon, 15 minutes.</p>
<p>This took about 6 months to develop. It compounds every month as new workflows are documented and new prompts are captured.</p>
`,
    exercise: {
      title: 'Document your personal AI OS',
      prompt: `This is the most important exercise in the Workflows track. Set aside 45 minutes.

Document your personal AI OS:

1. Your stack (one table): Task type → Tool → Reason
2. Your top 5 workflows (one paragraph each): Name, trigger, steps, output, pitfalls
3. Your decision criteria (one page): When you use AI by default, with verification, input only, and not at all
4. Your prompt library status: How many entries do you have? What's missing?
5. Your weekly review habit: When will you do it? What format?

Share this with one person — a colleague, a coach, anyone who can hold you accountable to using it.`,
      hint: "Done is better than perfect. A rough personal AI OS that you actually use is worth 10x a perfect one you never complete.",
      tools: ['Notion', 'Obsidian', 'Google Docs', 'Any notes system'],
    },
    recall: [
      {
        q: "What are the four components of a personal AI OS? Why does each one matter?",
        hint: "Stack, workflows, decision criteria, prompt library — what does each one solve?",
      },
      {
        q: "What is the weekly AI review and why is it the habit that separates compounding practitioners from stagnating users?",
        hint: "Think about the improvement loop: what gets captured, what gets refined, what compounds over time.",
      },
    ],
    reflection: `What is the current state of your personal AI OS? What's the most important missing piece? What would your system look like in 6 months if you maintained the weekly review habit?`,
    keyTakeaway: "A personal AI OS has four components: stack, documented workflows, decision criteria, and prompt library. The weekly review habit is what makes it compound. Done is better than perfect — start with what you have and iterate.",
  },

  {
    module: 16,
    slug: 'critical-thinking-with-ai',
    tier: 6,
    tierLabel: 'Tier 6 — Critical Evaluation',
    title: 'Critical Thinking with AI',
    subtitle: "When to trust AI, when to push back, and how to spot the errors that look like good answers.",
    duration: '13 min',
    hook: `The most dangerous AI outputs are not the obviously wrong ones — those you catch immediately. The dangerous ones are the ones that look right: well-structured, confident, plausible, and wrong in ways that are hard to detect without domain expertise or primary-source verification. This module is about developing the critical faculties to catch what casual review misses.`,
    concept: `
<h2>The Plausibility Trap</h2>

<p>AI is trained to produce plausible text. Plausibility and accuracy are related but not identical. A response can be entirely plausible — using the right vocabulary, following the right structure, citing the right type of sources — while containing claims that are factually false.</p>

<p>The plausibility trap: you evaluate AI output by asking "does this seem reasonable?" instead of "is this true?" The first question is answerable by reading. The second requires verification.</p>

<p>Expert AI users shift their default question from "does this seem right?" to "what would need to be true for this to be wrong?" This inversion surfaces specific claims to verify rather than general impressions to confirm.</p>

<h2>The Five Verification Triggers</h2>

<p>You don't need to verify everything. You need to verify outputs that trigger any of these:</p>

<ol>
  <li><strong>Specific numbers:</strong> Any statistic, percentage, or quantitative claim. These are hallucination-prone.</li>
  <li><strong>Citations and references:</strong> Always check that cited sources exist and say what AI claims they say.</li>
  <li><strong>Claims about specific individuals or organizations:</strong> AI frequently confabulates details about real entities.</li>
  <li><strong>Confident statements in your domain of expertise that contradict your knowledge:</strong> Trust your expertise when AI contradicts it — you're probably right.</li>
  <li><strong>Anything that would be embarrassing if wrong:</strong> Apply proportional scrutiny to consequential outputs.</li>
</ol>

<h2>Productive Pushback Techniques</h2>

<p>Critical thinking with AI isn't just verification — it's active dialogue. When an AI response seems incomplete or incorrect, productive pushback gets better outputs:</p>

<p><strong>"That doesn't match what I know about [X]. Can you explain your reasoning?"</strong> — Forces the model to expose its chain of reasoning, which often reveals where it went wrong or why there's apparent disagreement.</p>

<p><strong>"What would need to be true for the opposite position to be correct?"</strong> — Forces a more balanced analysis and often surfaces important caveats the first response omitted.</p>

<p><strong>"What's the strongest evidence against your recommendation?"</strong> — Steelmanning the alternative reveals whether the AI actually analyzed the question or just generated the most statistically common answer.</p>

<p><strong>"You said [claim]. What's your source, and how confident are you in this?"</strong> — Explicit confidence calibration. AI often reduces its certainty when directly asked, revealing where uncertainty was hidden in confident-sounding prose.</p>

<h2>The Expert Standard</h2>

<p>The best critical evaluation framework: would a genuine expert in this domain find this useful, or would they find it superficially plausible but missing important nuance?</p>

<p>If you're not that expert, find one. The most valuable thing you can do with an important AI-generated analysis is ask someone with deep domain expertise to read it critically. What do they agree with? What do they see as wrong or oversimplified?</p>
`,
    demoTitle: 'Catching plausible fabrication',
    demo: `
<p>An example of plausible fabrication that passes casual review:</p>

<p>A student asks AI to support their thesis with citations. AI provides five citations — author, title, journal, year, page numbers. All formatted correctly. The student uses them.</p>

<p>Two of the citations don't exist. The journals are real, the authors are real researchers, but those specific papers were never written. The fabrication is plausible because all the components are real; only the specific combination is invented.</p>

<p>The catch: a 5-minute Google Scholar search on each citation before use. This is a universal rule for AI-generated citations: verify every single one before citing it. No exceptions.</p>
`,
    exercise: {
      title: 'Apply critical thinking to a complex AI output',
      prompt: `Ask an AI a complex question in your professional domain — something where you have genuine expertise and could identify errors.

When you get the response:
1. List every specific claim that could be verified independently
2. For each claim, mark: probably right (matches your expertise), uncertain (outside your expertise), suspicious (contradicts what you know)
3. Verify the two claims you marked as most suspicious
4. Apply one productive pushback technique to an aspect of the response you found incomplete

Write up: how accurate was the response overall? What type of error did it make most? What did the pushback technique surface that the initial response missed?`,
      hint: "Choose a domain where you actually have expertise. You can't evaluate critical thinking quality on a topic you know nothing about.",
      tools: ['Claude', 'ChatGPT', 'Gemini'],
    },
    recall: [
      {
        q: "What is the plausibility trap in AI evaluation? How do you change your default evaluation question to avoid it?",
        hint: "Think about the difference between 'does this seem right?' and 'what would need to be true for this to be wrong?'",
      },
      {
        q: "Name the five verification triggers. Give a real example from your work where each one would apply.",
        hint: "Specific numbers, citations, claims about individuals/organizations, contradictions of your expertise, consequential embarrassment risk.",
      },
    ],
    reflection: `What is the biggest critical thinking gap in your current AI use? Where are you most likely to accept plausible-sounding output without sufficient verification?`,
    keyTakeaway: "The most dangerous AI errors are plausible ones. Shift from 'does this seem right?' to 'what would need to be true for this to be wrong?' Apply the five verification triggers. Use productive pushback to expose reasoning and surface hidden caveats.",
  },

  {
    module: 17,
    slug: 'ai-communication-and-transparency',
    tier: 6,
    tierLabel: 'Tier 6 — Critical Evaluation',
    title: 'AI Communication & Transparency',
    subtitle: "Attribution, disclosure, and professional integrity in an AI-assisted world.",
    duration: '10 min',
    hook: `Disclosure norms for AI are still forming. What's expected varies by industry, context, and organizational policy. But the practitioners who navigate this best aren't waiting for norms to settle — they've developed a principled framework for when they disclose AI use, how they communicate it, and where the line is between AI assistance and AI replacement. This module makes that framework explicit.`,
    concept: `
<h2>The Disclosure Spectrum</h2>

<p>AI use isn't binary — it spans a spectrum from full replacement to light assistance:</p>

<p><strong>Full replacement:</strong> AI generates the core content; human approves and sends. Highest disclosure obligation.</p>
<p><strong>Heavy assistance:</strong> AI provides substantial draft; human restructures and edits significantly.</p>
<p><strong>Moderate assistance:</strong> AI provides specific elements; human provides overall structure and judgment.</p>
<p><strong>Light assistance:</strong> AI helps with research, editing, or specific phrases; human writes the substantive content.</p>
<p><strong>Background tools:</strong> Spell check, grammar tools, research aggregators. Generally no disclosure expected.</p>

<p>Where on this spectrum disclosure becomes appropriate depends on context. Academic work and journalism have the strictest norms. Internal work has the most latitude. Professional services (consulting, legal, medical) are context-dependent and evolving.</p>

<h2>The Three Disclosure Questions</h2>

<ol>
  <li><strong>Would the recipient feel misled if they knew?</strong> If someone paying for your expertise would feel deceived to learn AI wrote the substantive content, that's a disclosure signal — and possibly a reason to reconsider the use case entirely.</li>
  <li><strong>Does the context have an explicit policy?</strong> Academic institutions, publishers, and many employers now have explicit AI use policies. Know them and follow them.</li>
  <li><strong>Am I representing AI output as my own judgment?</strong> Sharing AI analysis labeled as your professional recommendation without disclosure misrepresents what the client is receiving.</li>
</ol>

<h2>How to Communicate AI Use</h2>

<p>When disclosure is appropriate, how you communicate it matters:</p>

<p><strong>Straightforward:</strong> "This summary was generated with AI assistance and reviewed by me for accuracy." Honest, professional, no apology.</p>

<p><strong>Context-setting:</strong> "I used AI to synthesize the research — the analysis and recommendations are mine." Differentiates AI's role from your judgment.</p>

<p><strong>Proactive:</strong> Tell clients or stakeholders your AI use policy before they ask. This frames AI as a quality tool, not a shortcut — and establishes trust before it's tested.</p>

<h2>The Authenticity Standard</h2>

<p>Beyond disclosure: professional integrity with AI comes down to whether the judgment, expertise, and accountability are genuinely yours. Using AI to help you think and write more effectively is authentic. Using AI to simulate expertise you don't have is not — and the consequences of the latter are ultimately reputational.</p>
`,
    demoTitle: 'Proactive disclosure done well',
    demo: `
<p>A consultant includes this in their standard engagement terms:</p>
<p><em>"We use AI tools to assist with research synthesis, document drafting, and analysis — always with human expert review and accountability. All recommendations represent our professional judgment. We're happy to discuss our AI use practices in more detail if useful."</em></p>
<p>This sets expectations, frames AI as a quality tool, and positions the consultant as transparent and modern. It takes one paragraph to write and removes a potential trust problem before it arises.</p>
`,
    exercise: {
      title: 'Draft your personal AI disclosure approach',
      prompt: `Answer these questions in writing:

1. In your professional context, what types of AI use would you disclose, and what types are at the background-tool level?
2. Write a one-paragraph statement of your AI use approach — something you could include in a professional context or share with a client who asked.
3. Is there an explicit policy about AI use in your organization or industry? If yes, are there any gaps between what it says and what you currently do?
4. Is there anything you currently use AI for that you would feel uncomfortable disclosing if asked directly? If yes, that's your answer about whether to change that practice.

The last question is the most important one. Answer it honestly.`,
      hint: "Your answers to question 4 are more informative than your answers to question 1. Trust that discomfort.",
      tools: ['Any writing tool'],
    },
    recall: [
      {
        q: "Describe the disclosure spectrum. Where do the clearest disclosure obligations sit? Where is the most latitude?",
        hint: "Think about the full replacement end versus the light assistance end — and what contexts have stricter norms.",
      },
      {
        q: "What are the three disclosure questions? Which one is the most fundamental, and why?",
        hint: "Think about the 'would the recipient feel misled?' question — why is it more fundamental than the policy question?",
      },
    ],
    reflection: `Where in your current AI use is the gap between what you do and what you'd be comfortable disclosing? What would you need to change to close that gap?`,
    keyTakeaway: "AI disclosure depends on context, explicitness of policy, and whether you're representing AI output as your judgment. The authenticity standard: the judgment, expertise, and accountability must be genuinely yours. Proactive disclosure builds trust; reactive disclosure after a question erodes it.",
  },

  {
    module: 18,
    slug: 'domain-specific-ai-applications',
    tier: 6,
    tierLabel: 'Tier 6 — Critical Evaluation',
    title: 'Domain-Specific AI Applications',
    subtitle: "Deep dives into AI for your specific field — business, creative, technical, and education.",
    duration: '11 min',
    hook: `General AI fluency is the foundation. Domain-specific AI fluency is where real competitive advantage lives. The same AI tools that produce mediocre outputs for generic tasks produce exceptional outputs when a practitioner with deep domain knowledge knows exactly what to ask and how to evaluate the results. This module explores domain-specific patterns across four major areas.`,
    concept: `
<h2>Business and Management</h2>

<p><strong>Highest-value uses:</strong> Strategy synthesis, competitor analysis, financial narrative generation, board and executive communication, scenario planning, decision frameworks.</p>

<p><strong>Domain-specific prompting:</strong> "You are a senior strategy consultant with experience in [industry]. Analyze this situation using the frameworks typically applied at the strategy level..." The domain context (industry, strategy frameworks, audience level) is what separates generic business outputs from genuinely useful ones.</p>

<p><strong>Critical limits:</strong> AI has no access to your organization's actual data, culture, or competitive dynamics. It generates based on general patterns. Domain judgment — knowing how this organization specifically works — is irreplaceable.</p>

<h2>Creative Fields</h2>

<p><strong>Highest-value uses:</strong> Concept generation, brief development, variation generation, copy editing and tone adjustment, research for authentic detail, structural feedback.</p>

<p><strong>Domain-specific prompting:</strong> Creative professionals get the most value from AI by using it for volume and variation in the diverge phase, then applying their aesthetic judgment ruthlessly in the converge phase. AI doesn't have taste. You do.</p>

<p><strong>The authenticity question:</strong> In creative fields, the disclosure and authenticity considerations are particularly acute. Audiences often have a right to know when AI-generated content is presented as human-creative work. Know your field's norms.</p>

<h2>Technical and Engineering</h2>

<p><strong>Highest-value uses:</strong> Code generation (especially boilerplate and patterns), debugging assistance, documentation generation, architecture discussion, test case generation.</p>

<p><strong>Domain-specific prompting:</strong> The more context you give (language, framework, constraints, existing code patterns), the better the output. AI code generation is strongest for common patterns and weakest for novel architecture or highly specific business logic.</p>

<p><strong>Critical limits:</strong> AI-generated code requires review by a developer who understands the codebase context. AI will produce code that works in isolation but may introduce security vulnerabilities, violate existing patterns, or fail in ways that require domain knowledge to detect.</p>

<h2>Education and Learning</h2>

<p><strong>Highest-value uses:</strong> Content adaptation (adjust explanation for different levels), exercise and assessment generation, feedback drafting, research synthesis, curriculum gap analysis.</p>

<p><strong>Domain-specific prompting:</strong> "You are an instructional designer. Given this learning objective and this audience, generate..." — framing AI as a domain-aware collaborator produces better educational content than generic requests.</p>

<p><strong>Critical limits:</strong> AI cannot know your specific students, their prior knowledge, or what failed in last semester's version of a lesson. That contextual judgment belongs to the educator.</p>
`,
    demoTitle: 'Domain context as a prompt multiplier',
    demo: `
<p>The same question, two levels of domain context:</p>

<p><strong>Generic:</strong> "How should I present this financial data to stakeholders?"</p>
<p>Output: generic presentation advice applicable to anyone.</p>

<p><strong>Domain-specific:</strong> "I'm presenting Q3 results to a board that includes two former CFOs, one investor focused on unit economics, and three operational board members with no finance background. Revenue is flat, but margins improved significantly due to cost discipline. How should I frame this to land the margin story without glossing over the revenue miss?"</p>
<p>Output: advice that accounts for the specific audience composition, the specific financial narrative, and the specific communication tension to resolve — actionable in a way generic advice never is.</p>
`,
    exercise: {
      title: 'Map your domain-specific AI opportunities',
      prompt: `For your specific professional domain:

1. List the 5 tasks in your work that are most domain-specific (require your field's specific knowledge and vocabulary).
2. For each task: have you tried using AI for it? What happened?
3. For the 2 tasks where AI was least useful: what domain context was missing from your prompts? Rewrite them with full domain specificity.
4. For the 1 task where AI could add the most value with better prompting: build a domain-specific prompt for it and test it.

Document: what changed when you added domain context to your prompts?`,
      hint: "Domain context in prompts isn't just vocabulary — it's audience, constraints, stakes, and specific objectives that a generic version of your role wouldn't have.",
      tools: ['Claude', 'ChatGPT', 'Gemini'],
    },
    recall: [
      {
        q: "For your specific domain, what are the highest-value AI use cases and the most important critical limits? Be specific.",
        hint: "This question is intentionally about your domain. Generic answers indicate you haven't done the mapping yet.",
      },
      {
        q: "How does domain context function as a 'prompt multiplier'? Give an example from the lesson or from your own experience.",
        hint: "Think about what domain context gives the AI that a generic prompt doesn't — audience, constraints, stakes, specific vocabulary.",
      },
    ],
    reflection: `What is the one AI use case in your domain that would most change your practice if you fully developed it? What stands between you and building it?`,
    keyTakeaway: "Domain-specific AI fluency compounds general fluency. The same tools produce dramatically better outputs when the practitioner brings deep domain context to the prompt. AI has no access to your specific organizational reality — that judgment is yours and it's what makes the output valuable.",
  },

  {
    module: 19,
    slug: 'staying-current',
    tier: 6,
    tierLabel: 'Tier 6 — Critical Evaluation',
    title: 'Staying Current',
    subtitle: "How to track AI developments without drowning in noise. A system for continuous learning.",
    duration: '10 min',
    hook: `AI capabilities are developing faster than any other technology domain most of us have watched in our careers. A skill that was advanced in 2023 is table stakes in 2026. A limitation that defined your mental model might no longer apply. The practitioners who maintain their edge aren't consuming every article — they've built a systematic, low-time-cost approach to staying current that filters signal from noise.`,
    concept: `
<h2>The Signal-to-Noise Problem</h2>

<p>AI news is uniquely noisy because: the stakes are high (so everyone covers it), the hype incentive is strong (so claims get inflated), and the field changes fast (so yesterday's article is often wrong about tomorrow).</p>

<p>Most AI content falls into three categories:</p>
<ul>
  <li><strong>Announcement hype:</strong> New model, new feature, new startup — usually inflated in the short term.</li>
  <li><strong>Capability demonstrations:</strong> Look what this model can do now — often genuine, but rarely directly applicable to your work immediately.</li>
  <li><strong>Practitioner insight:</strong> Someone who actually uses AI for real work sharing what they learned. This is the signal worth finding.</li>
</ul>

<h2>The Minimum Viable AI Update System</h2>

<p>A system that takes 30-45 minutes per week and keeps you genuinely current:</p>

<p><strong>Weekly scan (15 min):</strong> One newsletter or curated source that filters to the most important developments. Good options: The Rundown AI, Import AI, Ben's Bites, Superhuman newsletter. Pick one and stick with it.</p>

<p><strong>Monthly deep read (30 min):</strong> One longer piece per month that goes beyond announcements — a practitioner's reflection, a research summary, a critical analysis. These compound more than weekly news does.</p>

<p><strong>Quarterly capability test (30-60 min):</strong> Every quarter, test the latest version of your primary AI tools on tasks where you know the previous performance. Notice what improved. Update your mental model accordingly.</p>

<p><strong>Community signal (ongoing):</strong> 1-2 communities where practitioners share real use cases, not just announcements. These are where you hear about techniques and use cases that haven't made it to mainstream coverage yet.</p>

<h2>Evaluating New Capability Claims</h2>

<p>When a new AI capability is announced, apply this filter before updating your behavior:</p>
<ol>
  <li>Is this independently verified or from the company announcing it?</li>
  <li>Does the benchmark measure something I actually care about?</li>
  <li>Has anyone I trust with my type of work tested this in real conditions?</li>
  <li>What would it take for me to actually adopt this in my workflow?</li>
</ol>

<p>Most announcements don't change your practice immediately. A few per year actually do. Your system should make it easy to identify which is which without evaluating every one.</p>
`,
    demoTitle: 'A quarterly capability test',
    demo: `
<p>A simple quarterly test protocol:</p>
<ol>
  <li>Take 3 prompts from your library that were challenging last quarter (the model got them wrong or partially right)</li>
  <li>Run them on the current version of your primary AI tool</li>
  <li>Compare: what changed? What improved? What still needs work?</li>
  <li>Update your mental model: one sentence about what the model is now better at and one about where it still falls short for your use cases</li>
</ol>
<p>This takes 30 minutes and produces a genuinely updated picture of the tool you're using — grounded in your real work, not someone else's benchmark.</p>
`,
    exercise: {
      title: 'Design your staying-current system',
      prompt: `Build your minimum viable AI update system. Document:

1. Weekly scan: which one newsletter or source will you use?
2. Monthly deep read: what type of content (format, source) qualifies? How will you find it?
3. Quarterly capability test: which 3 tasks will you use to test your primary tool each quarter? Write them down now.
4. Community signal: is there one community (Discord, Slack, LinkedIn group, forum) where practitioners in your field share real AI use cases?

Then: set up whatever recurring reminders or subscriptions you need to actually do this.

The system is not useful until it's scheduled.`,
      hint: "The goal is 30-45 minutes per week, not hours. A system you'll actually do beats a comprehensive one you won't.",
      tools: ['Any newsletter reader', 'Calendar for quarterly test', 'Community platform of choice'],
    },
    recall: [
      {
        q: "What are the three categories of AI content? Which is the highest-signal category, and how do you find it?",
        hint: "Announcement hype, capability demonstrations, practitioner insight — where is the signal that's directly applicable to your work?",
      },
      {
        q: "What are the four questions to ask when evaluating a new AI capability claim?",
        hint: "Source, benchmark relevance, trusted real-world testing, adoption criteria — why does each filter matter?",
      },
    ],
    reflection: `What is your current staying-current system, honestly assessed? How much time do you spend on AI news that actually changes your practice versus just consuming it?`,
    keyTakeaway: "A 30-45 minute weekly system beats hours of unfocused consumption. Weekly scan, monthly deep read, quarterly capability test, community signal. Apply the four-question filter to new capability claims before updating your behavior. Practitioner insight is the highest-signal content category.",
  },

  {
    module: 20,
    slug: 'workflows-assessment',
    tier: 6,
    tierLabel: 'Tier 6 — Workflows Gate',
    title: 'Workflows Assessment',
    subtitle: "Capstone project and AIQ reassessment. Demonstrate your Applied skills and unlock AI~Leadership.",
    duration: '25 min',
    hook: `AI~Workflows built your capacity for systematic, high-quality AI use. You've moved from individual prompts to documented workflows, from hoping for good outputs to evaluating them deliberately, from occasional use to an integrated personal AI operating system. The Workflows Assessment doesn't test what you've memorized — it tests what you can do.`,
    concept: `
<h2>What the Workflows Assessment Measures</h2>

<p>Three domains, each evaluated through demonstrated performance:</p>

<h3>Domain 1: Advanced Prompting (Tiers 4)</h3>
<p>Can you construct prompts that consistently produce excellent outputs? This includes chain-of-thought, few-shot examples, system-level framing, and constraint-setting — applied to a real, complex task.</p>

<h3>Domain 2: Workflow Design and Integration (Tier 5)</h3>
<p>Can you design, document, and execute a repeatable AI workflow? Can you identify where AI adds leverage versus where human judgment is required? Can you evaluate AI outputs systematically rather than intuitively?</p>

<h3>Domain 3: Critical Evaluation (Tier 6)</h3>
<p>Can you catch errors that look like good answers? Can you apply the five verification triggers? Can you make principled decisions about AI disclosure and accountability? Can you evaluate AI impact with real metrics?</p>

<h2>Assessment Format</h2>

<p>Four parts, each building on the others:</p>

<ol>
  <li><strong>Prompt engineering challenge:</strong> Solve a complex real-world task using at least three advanced techniques. Document your prompt design choices and why you made them.</li>
  <li><strong>Workflow documentation:</strong> Submit your most sophisticated documented workflow. It should include trigger, steps with actual prompts, handoffs, output, quality checkpoints, and pitfalls.</li>
  <li><strong>Critical evaluation exercise:</strong> Evaluate a provided AI output (or one you generate) using the systematic approach from Module 16. Identify at least one verification trigger and execute the verification.</li>
  <li><strong>Personal AI OS summary:</strong> Your stack, top 5 workflows, decision criteria, and prompt library status — submitted as a document you'll actually use going forward.</li>
</ol>

<h2>After Workflows</h2>

<p>AI~Leadership takes everything built in Workflows and scales it: from personal workflows to organizational systems, from individual adoption to team and cultural change, from using AI effectively to deploying it strategically. Tiers 7-9.</p>
`,
    demoTitle: 'What passing looks like',
    demo: `
<p>The Workflows Assessment has no numerical pass/fail. The standard:</p>
<ul>
  <li><strong>Prompt challenge:</strong> The output you produce is genuinely useful for a real task, and your documentation shows deliberate technique choices — not a lucky accident.</li>
  <li><strong>Workflow documentation:</strong> Someone else could follow this workflow and produce a comparable output. The handoffs are clear. The quality checkpoints are specific.</li>
  <li><strong>Critical evaluation:</strong> You identified a specific, non-obvious error or risk and either verified or flagged it — not just "I would check this" but "I checked this and found X."</li>
  <li><strong>Personal AI OS:</strong> This document reflects your actual practice, not an idealized version. Honest gaps are more valuable than polished fiction.</li>
</ul>
`,
    exercise: {
      title: 'Workflows Assessment',
      prompt: `Complete all four parts:

**Part 1 — Prompt Engineering Challenge:**
Choose a real, complex task from your work. Use at least three techniques from Module 2 (chain-of-thought, few-shot, system framing, constraints). Document: what techniques did you use, why did you choose each, and how did the output compare to a basic prompt on the same task?

**Part 2 — Workflow Documentation:**
Submit your most sophisticated documented workflow. Required sections: trigger, each step (with the actual prompt for AI steps), human review points, output specification, quality criteria, known pitfalls.

**Part 3 — Critical Evaluation:**
Take any AI-generated output (yours or provided). Apply the five verification triggers. Identify at least one claim that triggers verification. Execute the verification. Report what you found.

**Part 4 — Personal AI OS:**
Your documented stack, top 5 workflows, decision criteria framework, and prompt library entry count. Include one honest gap: what's the biggest weakness in your current AI OS?

Take the time this deserves. The Workflows Assessment is a portfolio artifact — something worth keeping and sharing.`,
      hint: "The honest gap in Part 4 is as important as the strengths. Practitioners who know their blind spots grow faster than ones who don't.",
      tools: ['Claude', 'ChatGPT', 'Any workflow tool', 'Any documentation tool'],
    },
    recall: [
      {
        q: "What are the three assessment domains, and what specific capability does each one test?",
        hint: "Advanced prompting, workflow design/integration, critical evaluation — what does demonstrating competence look like in each?",
      },
      {
        q: "Looking across all 20 Workflows modules: what is the single most important idea — the one that most changed how you work? Why that one?",
        hint: "No right answer. This is the Feynman test: if you can articulate what changed and why, you understood it.",
      },
    ],
    reflection: `Workflows complete. You now design systems, not just prompts. You evaluate outputs, not just produce them. You've built infrastructure that compounds. What problem will you solve with it that you couldn't have approached before?`,
    keyTakeaway: "AI~Workflows built the practitioner layer: systematic prompting, documented workflows, integrated tools, critical evaluation, and a personal AI OS that compounds. AI~Leadership scales these capabilities to organizational impact.",
  },
];

export function getLessonBySlug(slug: string): Lesson | undefined {
  return workflows.find(l => l.slug === slug);
}

export function getAdjacentLessons(slug: string): { prev: Lesson | null; next: Lesson | null } {
  const idx = workflows.findIndex(l => l.slug === slug);
  return {
    prev: idx > 0 ? workflows[idx - 1] : null,
    next: idx < workflows.length - 1 ? workflows[idx + 1] : null,
  };
}
