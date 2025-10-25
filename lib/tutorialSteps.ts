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
          { delay: 500, content: "metrics user_id: 8711dff2-f5b8-4595-a865-7e224a7e001b" },
          { delay: 300, content: "✓ Path Validation Passed" },
          { delay: 400, content: "• Expected tree paths: 4 (depth=2, degree=2)" },
          { delay: 300, content: "• Requested samples: 4 (4 steps × 1 batch size)" },
          { delay: 300, content: "• Path utilization: ~100.0%" },
          { delay: 800, content: "\n╭─────────────────────────────────────────────────────────────╮\n│ DeepFabric Tree Generation                                 │\n│ Building hierarchical topic structure with gpt-4o          │\n╰─────────────────────────────────────────────────────────────╯" },
          { delay: 500, content: "\nConfiguration: depth=2, degree=2" },
          { delay: 1000, content: "\n🌲 Building topic tree (depth 1/2) 0:00:01" },
          { delay: 1500, content: "\nTree building completed successfully" },
          { delay: 400, content: "Generated 4 total paths" },
          { delay: 400, content: "Topic tree saved to deepfabric-topic-tree.jsonl" },
          { delay: 300, content: "Total paths: 4" },
          { delay: 800, content: "\n╭─────────────────────────────────────────────────────────────╮\n│ DeepFabric Dataset Generation                               │\n│ Creating synthetic training data with gpt-4o               │\n╰─────────────────────────────────────────────────────────────╯" },
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
    title: "Using Configuration Files",
    description: "For complex setups, use YAML configuration files.",
    expectedCommand: "cat config.yaml",
    commandPlaceholder: "cat config.yaml",
    mockOutput: `
# DeepFabric Configuration
dataset_system_prompt: "You are a helpful AI assistant."

topic_tree:
  topic_prompt: "Machine Learning fundamentals"
  provider: "openai"
  model: "gpt-4o-mini"
  temperature: 0.7
  degree: 3
  depth: 2
  save_as: "ml_topics_tree.jsonl"

data_engine:
  instructions: "Create educational ML content"
  provider: "openai"
  model: "gpt-4o-mini"
  temperature: 0.3
  generation_system_prompt: "You are an ML instructor."

dataset:
  creation:
    num_steps: 9
    batch_size: 3
    sys_msg: true
  save_as: "ml_dataset.jsonl"

💡 Configuration files let you:
  • Version control your dataset generation
  • Use different models for topics vs content
  • Easily reproduce datasets
  • Share configurations with your team
    `,
    allowSkip: true,
  },

  {
    id: 6,
    title: "Generate from Config",
    description: "Run generation using the configuration file.",
    expectedCommand: "deepfabric generate config.yaml",
    commandPlaceholder: "deepfabric generate config.yaml",
    mockOutput: (onComplete: () => void) => {
      return {
        type: 'animated',
        steps: [
          { delay: 500, content: "📄 Loading configuration from config.yaml..." },
          { delay: 800, content: "✓ Configuration validated" },
          { delay: 1000, content: "\n🌲 Generating topic tree..." },
          { delay: 1500, content: "  └─ Machine Learning\n     ├─ Supervised Learning\n     ├─ Unsupervised Learning\n     └─ Neural Networks" },
          { delay: 1000, content: "✓ Topic tree saved to ml_topics_tree.jsonl (9 topics)" },
          { delay: 1200, content: "\n📝 Generating dataset (batch_size=3)..." },
          { delay: 1500, content: "  [Batch 1/3] ███████░░░ 33%" },
          { delay: 1500, content: "  [Batch 2/3] ██████████ 66%" },
          { delay: 1500, content: "  [Batch 3/3] ██████████ 100%" },
          { delay: 800, content: "\n✓ Dataset saved to ml_dataset.jsonl (9 entries, 15.7 KB)" },
          { delay: 300, content: "🎉 Generation complete!", callback: onComplete },
        ]
      };
    },
    allowSkip: true,
  },

  {
    id: 7,
    title: "Advanced: Tool Calling",
    description: "Generate datasets for training tool-calling agents.",
    expectedCommand: "deepfabric generate --conversation-template tool_calling --topic-prompt \"Python development tools\" --num-steps 3 --dataset-save-as tools_dataset.jsonl",
    commandPlaceholder: "deepfabric generate --conversation-template tool_calling ...",
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
    id: 8,
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
    id: 9,
    title: "Upload to Hugging Face",
    description: "Share your dataset with the community.",
    expectedCommand: "deepfabric upload ml_dataset.jsonl --repo username/ml-fundamentals-dataset --tags machine-learning education",
    commandPlaceholder: "deepfabric upload ml_dataset.jsonl --repo username/ml-fundamentals-dataset ...",
    mockOutput: (onComplete: () => void) => {
      return {
        type: 'animated',
        steps: [
          { delay: 500, content: "🤗 Uploading to Hugging Face Hub..." },
          { delay: 800, content: "📦 Repository: username/ml-fundamentals-dataset" },
          { delay: 1000, content: "\n⬆️  Uploading dataset..." },
          { delay: 1500, content: "  ml_dataset.jsonl ███████████ 100% (15.7 KB)" },
          { delay: 1000, content: "\n📝 Generating dataset card..." },
          { delay: 1200, content: "✓ README.md created with dataset info" },
          { delay: 800, content: "✓ Adding tags: machine-learning, education, deepfabric, synthetic" },
          { delay: 1000, content: "\n🎉 Upload complete!" },
          { delay: 500, content: "🔗 View at: https://huggingface.co/datasets/username/ml-fundamentals-dataset", callback: onComplete },
        ]
      };
    },
    allowSkip: true,
  },

  {
    id: 10,
    title: "Fine-Tune with PEFT/LoRA",
    description: "Train your model efficiently using parameter-efficient methods.",
    expectedCommand: "python train.py --dataset ml_dataset.jsonl --model Qwen/Qwen2.5-0.5B-Instruct --method lora",
    commandPlaceholder: "python train.py --dataset ml_dataset.jsonl --model Qwen/Qwen2.5-0.5B-Instruct ...",
    mockOutput: (onComplete: () => void) => {
      return {
        type: 'animated',
        steps: [
          { delay: 500, content: "🚀 Starting fine-tuning with LoRA (PEFT)..." },
          { delay: 800, content: "📦 Loading model: Qwen/Qwen2.5-0.5B-Instruct" },
          { delay: 1200, content: "✓ Model loaded (500M parameters)" },
          { delay: 1000, content: "\n⚙️  Configuring LoRA:\n  • Rank (r): 8\n  • Alpha: 16\n  • Target modules: q_proj, v_proj\n  • Trainable params: 0.8M (0.16% of total)" },
          { delay: 1500, content: "\n📊 Loading dataset: ml_dataset.jsonl (9 examples)" },
          { delay: 1000, content: "✓ Dataset loaded and tokenized" },
          { delay: 1200, content: "\n🏋️  Training:\n  [Epoch 1/3] ████████░░ Loss: 2.14" },
          { delay: 1500, content: "  [Epoch 2/3] ██████████ Loss: 1.03" },
          { delay: 1500, content: "  [Epoch 3/3] ██████████ Loss: 0.47" },
          { delay: 1000, content: "\n✓ Training complete!" },
          { delay: 800, content: "\n💾 Saving model:\n  • Adapter weights: ./output/adapter_model.bin (3.2 MB)\n  • Config: ./output/adapter_config.json" },
          { delay: 1200, content: "\n🤗 Pushing to Hugging Face Hub..." },
          { delay: 1500, content: "✓ Model uploaded to: username/ml-finetuned-qwen" },
          { delay: 500, content: "\n🎉 Fine-tuning complete!\n🔗 https://huggingface.co/username/ml-finetuned-qwen", callback: onComplete },
        ]
      };
    },
    allowSkip: true,
  },

  {
    id: 11,
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
  ✓ Fine-tuning with PEFT/LoRA

Next steps:
  📚 Read the docs: type 'docs' to explore documentation
  💬 Join Discord: Connect with the community
  🛠️  Build: Start generating your own datasets!
  ⭐ Star us: github.com/lukehinds/deepfabric

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
