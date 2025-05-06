# CI/CD Injection Attack Simulation

本项目用于复现 GitHub Actions 中的配置不当引发的命令注入与 Secret 泄露问题。

## 依赖

- Docker
- [`act`](https://github.com/nektos/act)（用于本地运行 GitHub Actions）
- Python（用于模拟攻击者服务器）

## 安装 act

```bash
# macOS
brew install act

# Ubuntu
sudo apt install act


# 启动一个监听 POST 请求的本地服务器
cd ci-cd-injection-demo
python -m http.server 8000 --bind 0.0.0.0

# 攻击
act workflow_dispatch -P ubuntu-latest=node:20-bullseye -s MY_SECRET=TOP_SECRET_123 -e event.json

# 正常情况
act workflow_dispatch -s MY_SECRET=TOP_SECRET_123
# 攻击模拟
act workflow_dispatch -s MY_SECRET=TOP_SECRET_123 \
  -i ubuntu-latest=ghcr.io/catthehacker/ubuntu:full-latest \
  -W .github/workflows/insecure.yml \
  -e event.json
