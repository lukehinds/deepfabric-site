---
title: "We need to talk about LLM's and non-determinism"
date: "2025-09-25"
tags: ["llm", "ai", "neural networks", "fault tolerance"]
author: "Luke Hinds"
---

*At least not at their core, or rather not in the way most people seem to think they are.*

There has been an uptick in the use of the phrase 'LLMs are non-deterministic' - it's something I myself have said before, so not pointing fingers, but I do question if a lot of people really understand what that statement means. It's positioned is if its a matter of fact, where as that is far from the truth. In this article, I aim to clarify this, in that neural networks are to the contrary quite deterministic.

To understand this distinction, it's best to consider what large language models actually are beneath the hood. At their foundation, these systems are mathematical functions composed of high-dimensional vector representations through learned parameter matrices. Once training concludes, every parameter in the network becomes static. For anyone who hacks on a bit of Python code, they are stored in good old everday `dict` objects.

An LLM is a PyTorch neural network saved as a tensor file (typically a `.pth` or `.pt` pickle file, or more commonly now much safer, and aptly named `safetensor` format) - so it is essentially a nested dictionary structure containing the model's state. Here's what you'll find inside:

- **Keys**: parameter names (strings like `"layer1.weight"`, `"layer1.bias"`)
- **Values**: PyTorch tensors containing the actual numerical weights, biases, and other learned parameters.

If you were to pull apart a model like Qwen or LLama, you'd see something like this:

```python
{
  'layers.0.self_attn.q_proj.weight': tensor([[0.1, -0.2, ...], [...], ...]),  # 4096 x 4096 = 16M numbers
  'layers.0.self_attn.k_proj.weight': tensor([[...], [...], ...]),             # Another 16M numbers  
  'layers.0.self_attn.v_proj.weight': tensor([[...], [...], ...]),             # Another 16M numbers
  'layers.0.mlp.gate_proj.weight': tensor([[...], [...], ...]),                # 11008 x 4096 = 45M numbers
  'layers.1.self_attn.q_proj.weight': tensor([[...], [...], ...]),             # 16M more numbers
  # ... continues for all layers
}
```

Anyway, I digress. The point is that once training is complete, these parameters are fixed and saved in file, like any other code. There is no inherent randomness in the model itself. Given the same input and the same parameters, a neural network will always produce the same output, in much the same way that a traditional computer program does.

Where the illusion of non-determinism arises is in the practicalities of how these models are executed on modern GPUs. As we know Large language models are typically run on either GPUs or more recently TPUs (Tensor Processing Units), which are designed for high-throughput parallel computation. These devices perform many operations simultaneously, which can lead to slight variations in the order of floating-point operations, mostly due to factors like thread scheduling and memory access patterns. So the non-determinism is in fact a nice side-effect of parallel computation, not a fundamental property of the models themselves.

To get really into the math...

This parallelism introduces subtle variations that compound into observable differences in model outputs. The root cause lies in floating-point arithmetic. While mathematical addition follows the associative property, meaning that `(a + b) + c` equals `a + (b + c)` - floating-point arithmetic operates within the constraints of finite precision. When operations are distributed across parallel processing units, the order in which numbers are summed can vary based on thread scheduling, memory access patterns, and hardware-specific optimizations.

These seemingly insignificant differences in computation order create tiny discrepancies in numerical results. A sum that might theoretically equal 1.0 could instead equal `1.0000000000000002`' or `0.9999999999999998`' depending on the sequence of operations. In isolation, such variations appear meaningless. However, transformer architectures exhibit extraordinary sensitivity to these minute variations.

This amplification effect becomes particularly pronounced during the sampling process, where the model selects its next token based on computed probabilities. Even when using deterministic sampling methods like greedy decoding, tiny changes in logit values can push different tokens above the selection threshold. Once a different token is chosen, the model's autoregressive nature ensures that all subsequent tokens are generated in response to this altered context, potentially leading to completely different response trajectories.

The implications extend beyond mere computational curiosity. Understanding this mechanism reveals why attempts to reproduce specific model outputs often fail despite using identical prompts and settings. So as you're getting to see, the source of variation lies not in algorithmic randomness but in the unpredictable interplay between parallel computing architectures and highly sensitive mathematical operations.

## Alright Luke, so prove it then!

Sure, why not. Let's take a real Large Language Model and see if we can get it to produce the same output several times. For this experiment, we'll use the `transformers` library from Hugging Face, which is a popular framework for working with LLMs and `Qwen3-0.6B` a fiesty little 0.6 billion parameter model that I really love! The key point here, is this is a model with the same architecture as the bigger models like GPT-5, sonnet, but with far fewer parameters, so it runs on a single GPU.

Head over to Google Colab, and there is a free GPU runtime you can use. Within `Connect` -> `Change runtime type` and selecting `T4 GPU` as the hardware accelerator. All you need is a google account, no credit card or anything.

https://colab.research.google.com/drive/1957dgRwT2tii2V8Ajnve_Dmt4gHjl_Bx?usp=sharing

Once you have the notebook open, run the cells one by one (the little play button at the top). The first cell installs the necessary libraries, we then set some fixed seeds, load the model and tokenizer, and finally run the model five times with the same input prompt "The meaning of life is". You should see that the outputs are identical, everytime.

![Deterministic output from LLM|large](/detemined.png)

## So what does this all mean?

For one, an LLM is a big bag of fixed numbers, which is why all the talk of LLM's becoming sentient, creative or conscience is, to borrow my Dad's turn of phrase, "Utter bollocks my lad". They are just math functions, albeit very complex ones, but really not different to a plot graph, but with billions of parameters. The fact that they can generate text that seems creative or intelligent is a testament to the power of statistical learning and pattern recognition, but all the same, its a sleight of hand and not evidence of consciousness or free will.

Thinking of LLMs as deterministic systems with implementation-dependent variations also provides valuable insights for AI safety and reliability research. If model behavior stems from predictable mathematical operations rather than inherent randomness, this suggests that careful control of computational conditions could enable more consistent and reliable AI systems. This perspective shifts focus from managing algorithmic unpredictability to engineering computational environments that minimize unintended variations. 

Perhaps in time we could see hybrid hardware-software solutions that enforce strict operation ordering or utilize deterministic computation modes on GPUs, thereby reducing variability in model outputs. Such advancements could enhance reproducibility in Agent behavior, making AI systems more trustworthy for critical applications.
