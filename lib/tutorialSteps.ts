export interface AnimatedOutput {
  type: 'animated';
  steps: Array<{
    delay: number;
    content: string;
    callback?: () => void;
  }>;
}

export interface TutorialStep {
  id: number;
  title: string;
  description: string;
  expectedCommand?: string;
  commandPlaceholder?: string;
  mockOutput: string | ((onComplete: () => void) => AnimatedOutput);
  autoAdvanceDelay?: number; // ms to auto-advance if no command needed
  allowSkip?: boolean;
  hasDownloadableFile?: string; // filename to download
}

export const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "Welcome to DeepFabric",
    description: "Learn how to generate synthetic training datasets for fine-tuning language models.",
    mockOutput: `
🚀 Welcome to the DeepFabric Interactive Tutorial!

DeepFabric is a specialized framework for training small language models (SLMs)
to become efficient, capable Agents

In this tutorial, you'll learn:
  ✓ How to install DeepFabric
  ✓ How to generate datasets with the CLI
  ✓ Using configuration files for complex setups
  ✓ Different generation modes and use cases
  ✓ Uploading datasets to Hugging Face Hub
  ✓ Fine-tuning models with PEFT/LoRA

Press 'Next Step' or type 'continue' to begin!
    `,
    expectedCommand: "continue",
    commandPlaceholder: "Type 'continue' or click Next Step...",
    allowSkip: false,
  },
  {
    id: 2,
    title: "Installation",
    description: "Install DeepFabric using pip.",
    expectedCommand: "pip install deepfabric",
    commandPlaceholder: "pip install deepfabric",
    mockOutput: (onComplete: () => void) => {
      return {
        type: 'animated',
        steps: [
          { delay: 500, content: "Collecting deepfabric" },
          { delay: 800, content: "  Downloading deepfabric-0.1.0-py3-none-any.whl (45 kB)" },
          { delay: 600, content: "Collecting pydantic>=2.0.0" },
          { delay: 400, content: "  Using cached pydantic-2.5.0-py3-none-any.whl (380 kB)" },
          { delay: 600, content: "Collecting openai>=1.0.0" },
          { delay: 400, content: "  Using cached openai-1.6.1-py3-none-any.whl (225 kB)" },
          { delay: 600, content: "Collecting anthropic>=0.8.0" },
          { delay: 400, content: "  Using cached anthropic-0.8.1-py3-none-any.whl (120 kB)" },
          { delay: 500, content: "Installing collected packages: pydantic, openai, anthropic, deepfabric" },
          { delay: 800, content: "✓ Successfully installed deepfabric-0.1.0" },
          { delay: 300, content: "\n🎉 DeepFabric is ready to use!", callback: onComplete },
        ]
      };
    },
    allowSkip: true,
  },
  {
    id: 3,
    title: "Basic Generation",
    description: "Generate your first dataset using a configuration file. Download quickstart.yaml to get started.",
    expectedCommand: "deepfabric generate quickstart.yaml",
    commandPlaceholder: "deepfabric generate quickstart.yaml",
    hasDownloadableFile: "quickstart.yaml",
    mockOutput: (onComplete: () => void) => {
      return {
        type: 'animated',
        steps: [
          { delay: 300, content: "✓ Path Validation Passed" },
          { delay: 400, content: "• Expected tree paths: 4 (depth=2, degree=2)" },
          { delay: 300, content: "• Requested samples: 4 (4 steps × 1 batch size)" },
          { delay: 300, content: "• Path utilization: ~100.0%" },
          { delay: 800, content: "\n╭─────────────────────────────────────────────────────────────╮\n│ DeepFabric Tree Generation                                  │\n│ Building hierarchical topic structure with gpt-4o           │\n╰─────────────────────────────────────────────────────────────╯" },
          { delay: 500, content: "\nConfiguration: depth=2, degree=2" },
          { delay: 1000, content: "\n🌲 Building topic tree (depth 1/2) 0:00:01" },
          { delay: 1500, content: "\nTree building completed successfully" },
          { delay: 400, content: "Generated 4 total paths" },
          { delay: 400, content: "Topic tree saved to deepfabric-topic-tree.jsonl" },
          { delay: 300, content: "Total paths: 4" },
          { delay: 800, content: "\n╭─────────────────────────────────────────────────────────────╮\n│ DeepFabric Dataset Generation                               │\n│ Creating synthetic training data with gpt-4o                │\n╰─────────────────────────────────────────────────────────────╯" },
          { delay: 500, content: "\n─────────────────────── Generation Parameters ───────────────────────" },
          { delay: 300, content: "Model:          gpt-4o" },
          { delay: 300, content: "Steps:          4" },
          { delay: 300, content: "Batch Size:     1" },
          { delay: 300, content: "Total Samples:  4" },
          { delay: 1000, content: "\n📝 Generating dataset samples ████████████████████ 4/4 • 4/4 0:01:00 0:00:00" },
          { delay: 800, content: "\nSuccessfully generated 4 samples" },
          { delay: 400, content: "Dataset saved to: training-dataset.jsonl" },
          { delay: 600, content: "\nApplying formatters..." },
          { delay: 800, content: "Formatted dataset saved to dataset.jsonl using trl_sft formatter" },
          { delay: 400, content: "Applied 'trl_sft' formatter: 4 samples" },
          { delay: 300, content: "\n🎉 Generation complete!", callback: onComplete },
        ]
      };
    },
    allowSkip: true,
  },

  {
    id: 4,
    title: "View Generated Dataset",
    description: "Let's examine what was generated.",
    expectedCommand: "cat dataset.jsonl | head -20",
    commandPlaceholder: "cat dataset.jsonl | head -20",
    mockOutput: `
{
  "messages": [
    {
      "role": "user",
      "content": "Can you explain Python variables and data types?"
    },
    {
      "role": "assistant",
      "content": "In Python, variables are containers for storing data values. Python has several built-in data types including: integers (int), floating-point numbers (float), strings (str), booleans (bool), lists, dictionaries, and more. Unlike some languages, Python is dynamically typed, meaning you don't need to declare variable types explicitly."
    }
  ]
}
{
  "messages": [
    {
      "role": "user",
      "content": "How do control flow statements work in Python?"
    },
...

✓ Dataset contains 4 Q&A pairs in OpenAI format
✓ Ready for fine-tuning or further processing!
    `,
    allowSkip: true,
  },

  {
    id: 5,
    title: "Advanced: Tool Calling",
    description: "Generate datasets for training tool-calling agents.",
    expectedCommand: "deepfabric generate agent_tool_calling.yaml",
    commandPlaceholder: "deepfabric generate agent_tool_calling.yaml",
    hasDownloadableFile: "agent_tool_calling.yaml",
    mockOutput: (onComplete: () => void) => {
      return {
        type: 'animated',
        steps: [
          { delay: 500, content: "🔧 Generating tool-calling dataset..." },
          { delay: 1000, content: "📋 Template: tool_calling with reasoning traces" },
          { delay: 1500, content: "\n✓ Generated examples with:\n  • Tool selection reasoning\n  • Parameter construction\n  • Execution traces\n  • Multi-step workflows" },
          { delay: 800, content: "\n✓ Dataset saved to tools_dataset.jsonl (3 entries)" },
          { delay: 300, content: "🎯 Ready for training agents!", callback: onComplete },
        ]
      };
    },
    allowSkip: true,
  },

  {
    id: 6,
    title: "View Tool Calling Dataset",
    description: "Examine the generated tool-calling dataset.",
    expectedCommand: "cat tools_dataset.jsonl | head -30",
    commandPlaceholder: "cat tools_dataset.jsonl | head -30",
    mockOutput: `
{
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "read_file",
        "description": "Read contents of a file",
        "parameters": {
          "type": "object",
          "properties": {
            "path": {"type": "string", "description": "File path"}
          }
        }
      }
    }
  ],
  "messages": [
    {
      "role": "user",
      "content": "Can you check the error logs?"
    },
    {
      "role": "assistant",
      "content": "I'll read the error log file to diagnose the issue.",
      "tool_calls": [
        {
          "id": "call_1",
          "type": "function",
          "function": {
            "name": "read_file",
            "arguments": "{\\"path\\": \\"/var/log/errors.log\\"}"
          }
        }
      ]
    }
  ]
}

💡 This format is ready for:
  • TRL SFTTrainer (tool calling fine-tuning)
  • OpenAI-compatible APIs
  • Custom agent training pipelines
    `,
    allowSkip: true,
  },

  {
    id: 7,
    title: "Upload to Hugging Face",
    description: "Share your dataset with the community.",
    expectedCommand: "deepfabric upload dataset.jsonl --repo username/agent-training-dataset --tags deepfabric synthetic",
    commandPlaceholder: "deepfabric upload dataset.jsonl --repo username/agent-training-dataset ...",
    mockOutput: (onComplete: () => void) => {
      return {
        type: 'animated',
        steps: [
          { delay: 500, content: "🤗 Uploading to Hugging Face Hub..." },
          { delay: 800, content: "📦 Repository: username/agent-training-dataset" },
          { delay: 1000, content: "\n⬆️  Uploading dataset..." },
          { delay: 1500, content: "  dataset.jsonl ███████████ 100% (2.3 KB)" },
          { delay: 1000, content: "\n📝 Generating dataset card..." },
          { delay: 1200, content: "✓ README.md created with dataset info" },
          { delay: 800, content: "✓ Adding tags: deepfabric, synthetic" },
          { delay: 1000, content: "\n🎉 Upload complete!" },
          { delay: 500, content: "🔗 View at: https://huggingface.co/datasets/username/agent-training-dataset", callback: onComplete },
        ]
      };
    },
    allowSkip: true,
  },

  {
    id: 8,
    title: "Fine-Tune with PEFT/LoRA",
    description: "Use your dataset to fine-tune efficiently using parameter-efficient methods.",
    expectedCommand: "deepfabric format --repo \"username/agent-training-dataset\" -f trl_sft_tools -o dataset.jsonl",
    commandPlaceholder: "deepfabric format --repo \"username/agent-training-dataset\" -f trl_sft_tools -o dataset.jsonl",
    mockOutput: (onComplete: () => void) => {
      return {
        type: 'animated',
        steps: [
          { delay: 500, content: "dataset = load_dataset(\"json\", data_files=\"dataset.jsonl\", split=\"train\")" },
          { delay: 800, content: "data/train-00000-of-00001.parquet: 100% 9.66M/9.66M [00:01<00:00, 7.23MB/s]" },
          { delay: 1200, content: "Generating train split: 100% 10050/10050 [00:00<00:00, 98973.13 examples/s]" },
          { delay: 1000, content: "Loaded 10000 samples from username/agent-training-dataset:train" },
          { delay: 1500, content: "Applying formatters..." },
          { delay: 1000, content: "Formatted dataset saved to dataset.jsonl using trl_sft_tools formatter" },
          { delay: 1200, content: "\n🏋️  Training:\n  [Epoch 1/3] ████████░░ Loss: 2.14" },
          { delay: 1500, content: "  [Epoch 2/3] ██████████ Loss: 1.03" },
          { delay: 1500, content: "  [Epoch 3/3] ██████████ Loss: 0.47" },
          { delay: 1000, content: "\n✓ Training complete!" },
          { delay: 800, content: "\n💾 Saving model:\n  • Adapter weights: ./output/adapter_model.bin (3.2 MB)\n  • Config: ./output/adapter_config.json" },
          { delay: 1200, content: "\n🤗 Pushing to Hugging Face Hub..." },
          { delay: 1500, content: "✓ Model uploaded to: username/agent-finetuned-agent" },
          { delay: 500, content: "\n🎉 Fine-tuning complete!\n🔗 https://huggingface.co/username/agent-finetuned-agent", callback: onComplete },
        ]
      };
    },
    allowSkip: true,
  },

  {
    id: 9,
    title: "Tutorial Complete!",
    description: "You've learned the essentials of DeepFabric.",
    mockOutput: `
🎓 Congratulations! You've completed the DeepFabric tutorial.

What you've learned:
  ✓ Basic CLI dataset generation
  ✓ Using configuration files
  ✓ Advanced templates (tool calling, CoT)
  ✓ Viewing and understanding datasets
  ✓ Uploading to Hugging Face Hub
  ✓ Fine-tuning with your dataset using PEFT/LoRA

Next steps:
  📚 Read the docs: type 'docs' to explore documentation
  💬 Join Discord: Connect with the community https://discord.gg/pPcjYzGvbS
  ⭐ Star us: https://github.com/always-further/deepfabric

Common commands to try:
  • deepfabric info         - Show version and config
  • deepfabric format       - Convert dataset formats
  • deepfabric validate     - Check config files
  • deepfabric visualize    - See topic graphs

Type 'exit' to return to the main terminal.
    `,
    expectedCommand: "exit",
    commandPlaceholder: "Type 'exit' to return to terminal",
    autoAdvanceDelay: 0,
    allowSkip: false,
  },
];
