# Landing-page AI figures

Checked on 2026-09-30. The hero uses `2.8 trillion parameters · 15,000 W max`.

## Model size

[Moonshot's Kimi K3 model card](https://huggingface.co/moonshotai/Kimi-K3)
discloses 2.8 trillion total parameters and 104 billion activated parameters per
token. The hero reports the total, not the activated count.

Kimi K3 is the largest released language model with a publisher-confirmed
parameter count found in this check. The [Epoch model database](https://epoch.ai/data/notable_ai_models.csv)
was used to identify candidates, then checked against publisher documentation.
Qwen3.8-2.4T-A95B has 2.4 trillion parameters. Larger Grok estimates were not
confirmed by the checked publisher announcement. This does not establish an
absolute maximum for models whose sizes are undisclosed.

## Inference deployment power

The [SGLang Kimi K3 cookbook](https://docs.sglang.io/cookbook/autoregressive/Moonshotai/Kimi-K3)
documents verified single-node, eight-B300 inference configurations.
[NVIDIA's DGX B300 guide](https://docs.nvidia.com/dgx/dgxb300-user-guide/introduction-to-dgxb300.html)
specifies eight B300 GPUs and a **15 kW system maximum** in its Power
Specifications table: 15 kW × 1,000 = 15,000 W.

This is a hardware power ceiling for an example deployment, not measured Kimi K3
inference power, average power, energy per query, or data-center cooling power.
Actual consumption depends on load and serving configuration. The visible `max`
label and bilingual hover description preserve that distinction. Comparing this
ceiling with the brain's approximate 20 W does not establish an efficiency ratio
for equivalent work. No measured model-specific wattage was found in the cited
deployment documentation.
