# 上线到 https://lafala.tech 的步骤

新站本地已经跑通：6 个路由（/、/en、/product、/en/product、/contact、/en/contact）+ sitemap + robots + 动态 OG。Build green, 0 console errors, 中英双语 + 桌面/移动端均验证。

**当前现状**：`https://lafala.tech` 仍然指向 GitHub Pages 上 2024 年那个老站。要让 `https://lafala.tech` 打开新网站，必须做以下事情——这部分只有你（持有域名和 GitHub 账号的人）能做。

---

## 1. 推到 GitHub（2 分钟）

新代码在 `next/v1` 分支。先把它推上去：

```bash
cd /Users/I551288/Documents/mycode/lafala/lafala-site
git push origin next/v1
git push origin legacy-html5up   # 保留旧站 tag 归档
```

打开 GitHub 上的仓库（`michael-lafala/lafala-stie`），把分支合并到 `main`：

- 要么 PR `next/v1` → `main` 再 merge
- 要么本地直接：
  ```bash
  git checkout main
  git merge next/v1 --ff-only
  git push origin main
  ```

可选但建议：把仓库名从 `lafala-stie`（typo）改为 `lafala-erp-site`。Settings → General → Repository name。改名后 `git remote set-url origin <new-url>`。

---

## 2. 关掉 GitHub Pages（30 秒）

仓库 Settings → Pages → Source 改成 `None`。这一步必须做，否则 GitHub 还会继续在 `lafala.tech` 上 serve 老站。

---

## 3. 部署到 Vercel（5 分钟）

1. 打开 https://vercel.com/new → Import Git Repository → 选 `lafala-erp-site`
2. Framework 自动识别 Next.js。Root Directory 默认根。Build Command / Output 都用默认（pnpm 也自动识别）
3. 不需要任何环境变量
4. 点 Deploy。一两分钟后会拿到一个临时 URL，比如 `lafala-erp-site-xxxxx.vercel.app`
5. 打开这个临时 URL **先确认 5 个东西**：
   - `/` 出中文首页，⌘K demo 在右侧自动播放
   - 点右上角语言切到 EN → `/en` 出英文，再切回中
   - 缩小窗口到手机宽 → 汉堡菜单 → 抽屉打开能看到导航
   - `/product`、`/contact` 都正常
   - `/sitemap.xml`、`/robots.txt` 出内容

如果有问题，先在临时域名修，不要急着切 DNS。

---

## 4. 绑定 lafala.tech 到 Vercel（5 分钟 + DNS 传播时间）

Vercel 项目 → Settings → Domains：

1. 输入 `lafala.tech`，点 Add
2. 输入 `www.lafala.tech`，点 Add，再把它设为 redirect 到 apex
3. Vercel 会显示需要的 DNS 记录，大概是：

   ```
   A     @     76.76.21.21
   CNAME www   cname.vercel-dns.com
   ```

   （`A` 记录的 IP 以 Vercel 当前显示的为准。）

4. 去你的域名注册商面板（看 `lafala.tech` 当时在哪买的——常见的是 Namecheap、Cloudflare、阿里云）：
   - **删掉**所有指向 GitHub Pages 的旧记录（通常是 4 条 A 记录指向 `185.199.108.153` / `185.199.109.153` / `185.199.110.153` / `185.199.111.153`）
   - **删掉**任何老的 CNAME（比如 `michael-lafala.github.io`）
   - **加上** Vercel 给的那两条记录

5. 保存后等 DNS 生效。一般几分钟，慢则 1~24 小时（按 TTL）。

可以一边等一边在终端确认：
```bash
dig lafala.tech +short        # 应该出 76.76.21.21
dig www.lafala.tech +short    # 应该出 cname.vercel-dns.com 然后解析到 Vercel IP
```

---

## 5. 验证 https://lafala.tech（5 分钟）

DNS 生效后：

```bash
# 状态码
curl -sI https://lafala.tech/ | head -5
curl -sI https://lafala.tech/en | head -5
curl -sI https://lafala.tech/product | head -5
curl -sI https://lafala.tech/contact | head -5
curl -sI https://lafala.tech/sitemap.xml | head -5

# 内容
curl -s https://lafala.tech/ | grep -oE '<title>[^<]+</title>'
curl -s https://lafala.tech/ | grep -oE '<html lang="[^"]+"'
```

应该看到 `HTTP/2 200`、中文 `<title>`、`lang="zh-CN"`。然后浏览器打开 https://lafala.tech、https://lafala.tech/en、手机里也打开一遍。

Lighthouse 跑一下（Chrome DevTools → Lighthouse → Mobile）：Performance / A11y / Best Practices / SEO 都应该 ≥90。

---

## 6. 之后

- 真微信 QR：替换 `public/wechat-qr.png`，并把 `components/contact/qr-card.tsx` 里的 pseudo-pattern 换成 `<Image src="/wechat-qr.png">`
- SVG logo：扔到 `public/logo.svg`，把 `components/shared/logo-mark.tsx` 里的 `Image` 改成 `<img src="/logo.svg">`
- 仓库改名 `lafala-erp-site` 时，Vercel 自动跟随；GitHub 会给老名字保留 redirect，不会断
- 如果你想之后再加 blog / pricing / 登录入口，所有的脚手架都准备好了，加文件即可

---

## 我这边帮不上的事

- 推 GitHub（要你的凭证 / `gh auth`）
- 在 Vercel 上点 Deploy
- 在域名注册商面板改 DNS

这三步过完，`https://lafala.tech` 立刻就是新站了。
