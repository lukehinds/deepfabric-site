---
title: "Generate Datasets from a Prompt: The DeepFabric Claude Code Skill"
date: "2026-02-26"
excerpt: "Skip the YAML. Skip the docs. A Claude Code skill that turns a single sentence into a fine-tuning-ready synthetic dataset, with interactive setup, knowledge graph generation, and a training script included."
tags: ["deepfabric", "claude-code", "synthetic-data", "fine-tuning", "skills", "llm", "dataset-generation"]
author: "Advaith Sujith"
---

If you've used DeepFabric before, you know the drill: install the package, write a YAML config, figure out the right `depth` and `degree` for your knowledge graph, pick a conversation type, deal with provider keys, maybe set up a Spin server for mock files. It's not complicated once you know what you're doing. But there's a real cost to bootstrapping all of that every time you start a new dataset project.

The **DeepFabric Claude Code skill** removes that friction entirely. You describe your topic. Claude handles the rest.

## What is a Claude Code Skill?

Claude Code [skills](https://docs.anthropic.com/en/docs/claude-code/skills) are structured instruction sets that extend Claude Code's capabilities for specific workflows. When a skill is installed, Claude Code loads its instructions and can follow them step-by-step - asking the user targeted questions, running commands, creating files, and validating outputs along the way.

The DeepFabric generator skill is a purpose-built skill that guides you through the entire dataset creation process: from gathering your requirements, to running `deepfabric generate`, to producing a ready-to-use fine-tuning script.

## Installing the Skill

Clone the skill into your Claude Code skills directory. If you have it as a folder already, it's just a copy:

```bash
cp -r deepfabric-generator ~/.claude/skills/
```

Or if you're setting up a project-level skill (which keeps it scoped to the current repo):

```bash
cp -r deepfabric-generator .claude/skills/
```
Thats it!

The directory structure should look like this:

```
deepfabric-generator/
├── SKILL.md
├── README.md
└── assets/
    ├── config_template.yaml
    └── template_train.py
```

Once installed, the skill is automatically available the next time you start Claude Code.

## Before You Start: Export Your API Key

Before launching Claude Code, export your API key in the same terminal session. The skill uses the key to call the frontier model during generation, and it needs to be set in the environment before you start.

For Gemini (recommended - has a free tier):

```bash
export GEMINI_API_KEY="your-key-here"
```

For Anthropic:

```bash
export ANTHROPIC_API_KEY="your-key-here"
```

Then launch Claude Code from that same terminal. If you start Claude Code first and export the key after, it won't be picked up. To avoid having to do this every session, add the export to your shell profile (`~/.zshrc` or `~/.bashrc`).

## The Workflow

Tell Claude Code you want to generate a dataset:

> "Generate a dataset about building REST APIs in Python"

Claude Code picks up the skill and starts walking you through setup.

### Step 1: Understanding the Knowledge Graph

Before asking for your settings, the skill explains how DeepFabric structures data generation using a knowledge graph, so you understand what you're actually configuring. For example, if your topic is "building REST APIs in Python", the explanation looks like:

```
REST APIs in Python
├── Authentication     -> JWT, OAuth2, API Keys
├── Request Handling   -> Routing, Validation, Middleware
└── Data Layer         -> ORM, Migrations, Query Optimization
```

**Depth** is how many levels deep the graph goes. **Degree** is how many branches come off each node. Together they determine the number of unique subtopics, and the diversity of your dataset. The skill shows you exactly how many topics each combination produces before you choose.

You pick depth and degree from an interactive menu rather than typing raw numbers.

### Step 2: Provider and Customization

The skill then asks which API provider to use (Gemini or Anthropic), and whether you want it to pick the best defaults for your topic or walk you through each option manually.

If you choose defaults, Claude Code analyzes your topic and picks sensible values. For a coding topic like REST APIs, it would choose instruction-following conversations with chain-of-thought reasoning, and recommend including mock files so the dataset includes realistic file operations.

The defaults are explained to you before anything is created, so you can push back if something feels off.

If you choose to customize, you're walked through:
- **Conversation type** - Q&A, instruction-following, or chat
- **Reasoning style** - chain-of-thought, direct, or step-by-step
- **Number of samples** - matched to your topic count or scaled up for richer coverage
- **Mock files** - whether to include simulated file I/O in training conversations

### Step 3: The Generated Config

All of this feeds into a YAML config that DeepFabric can read. Here's an example for a REST API dataset with mock files enabled:

```yaml
topics:
  prompt: "Building REST APIs in Python"
  mode: graph
  depth: 3
  degree: 3
  save_as: "topics.jsonl"
  llm:
    provider: "gemini"
    model: "gemini-2.5-flash"
    temperature: 0.8

generation:
  system_prompt: "You are an expert Python backend developer..."
  instructions: "Create detailed, practical examples with working code."
  conversation:
    type: cot
    reasoning_style: agent
  tools:
    spin_endpoint: "http://localhost:3030"
    components:
      builtin:
        - read_file
        - write_file
        - list_files
    scenario_seed:
      files:
        "main.py": |
          from fastapi import FastAPI
          app = FastAPI()
          # TODO: add your routes here
        "requirements.txt": |
          fastapi==0.115.0
          uvicorn==0.32.0
    max_per_query: 3
    max_agent_steps: 5
  llm:
    provider: "gemini"
    model: "gemini-2.5-flash"
    temperature: 0.7

output:
  system_prompt: |
    You are a helpful Python backend development assistant.
  num_samples: 27
  batch_size: 5
  save_as: "dataset.jsonl"
```

The config is created in a dedicated folder named after your topic. All output files land there too, keeping things clean.

### Step 4: Dataset Generation

With the config ready, the skill runs:

```bash
cd rest_apis_python && deepfabric generate rest_apis_python_config.yaml --tui simple
```

The `--tui simple` flag makes progress visible in Claude Code's terminal. You'll see topics being generated, then samples streaming in as DeepFabric distills conversations from the frontier model. If mock files are enabled, you'll see the file tool calls happening in real time.

Generation typically takes 25-30 minutes for a balanced depth/degree config. Once it finishes, the skill checks that `dataset.jsonl` exists, is non-empty, and has roughly the expected sample count. If something went wrong mid-run, it investigates before moving on.

### Step 5: Training Script

The last thing the skill creates is a fine-tuning script using [TRL's SFTTrainer](https://huggingface.co/docs/trl/sft_trainer):

```python
from datasets import load_dataset
from trl import SFTTrainer, SFTConfig
from transformers import AutoTokenizer, AutoModelForCausalLM

model_name = "Qwen/Qwen3-0.6B"
dataset = load_dataset("json", data_files="dataset.jsonl", split="train")

# ... training configuration
```

The default model is `Qwen/Qwen3-0.6B` - small enough to train locally, capable enough to verify the dataset works. The skill asks if you want to swap it out before finishing.

## What You End Up With

For each run, you get a self-contained project folder:

| File | Description |
|---|---|
| `<topic>_config.yaml` | DeepFabric configuration |
| `topics.jsonl` | Generated knowledge graph |
| `dataset.jsonl` | Synthetic training dataset |
| `<topic>_train.py` | Fine-tuning script |

&nbsp;

Everything is in one place. You can inspect the topics file to understand what subtopics were generated, examine the dataset to sanity-check sample quality, and run the training script directly once you're happy.

## Mock Files: What They Are and When to Use Them

When mock files are enabled, each training sample isn't just a Q&A exchange. It's a multi-step agent conversation where the model reads files, reasons about them, writes code, and explains its decisions. The "files" are seeded into a Spin server that the model can actually call during generation.

This produces richer, more realistic training data for models that will operate as coding assistants or agents. The trade-off is you need a running Spin server:

```bash
# Easiest option - Docker
cd /path/to/deepfabric/tools-sdk && docker compose up -d
```

The skill handles the rest: verifying the server is up, setting the right endpoint in the config, and stopping the server when generation is done (if you ran it locally).

For non-coding topics - recipes, history, math concepts - mock files don't add value and you can skip them entirely.

## The Bigger Picture

The skill is opinionated in a good way: it makes the easy path the right path. You don't need to read the DeepFabric docs to get sensible outputs. The defaults are chosen based on your topic, explained before they're applied, and easy to override.

For teams using DeepFabric regularly, the skill means new members can generate their first dataset in a single conversation without needing to understand the full config schema. For solo developers, it means less time on boilerplate and more time evaluating and improving the data.

---

### Resources

- **DeepFabric GitHub**: [https://github.com/always-further/deepfabric](https://github.com/always-further/deepfabric)
- **DeepFabric Docs**: [https://docs.deepfabric.dev/](https://docs.deepfabric.dev/)
- **Claude Code Skills**: [https://docs.anthropic.com/en/docs/claude-code/skills](https://docs.anthropic.com/en/docs/claude-code/skills)
