# JobHunt Automation

Quét tin tuyển dụng IT (Facebook, ITviec, VietnamWorks), phân loại bằng rule + LLM, lọc trong app và soạn draft ứng tuyển. Proposal đầy đủ: [JobHunt Automation – Proposal](https://claude.ai/artifact/N3rJEoRUAgeYWzhpWyug7a).

## Trạng thái: Phase 0 (nền tảng)

| Phần | Có gì |
| --- | --- |
| `packages/domain` | Core domain, viết test-first. Slice đầu: `classifyPost` gắn NotIT / IT + nhóm nghề / NeedsReview (6 test). |
| `apps/api` | NestJS 12 (modular monolith): `GET /health`, `POST /classification/preview`. Unit + e2e test bằng Vitest. |
| `apps/dashboard` | Next.js 16, trang khung. |
| `apps/mobile` | Expo SDK 58, màn hình khung. |
| `infra/docker-compose.yml` | Postgres 17, NATS JetStream, API, dashboard. |
| `.github/workflows/ci.yml` | Lint, typecheck, test, e2e, build, build Docker image. Chưa deploy (chờ có VM). |

## Chạy trên Windows

Cần: Node 22, pnpm 10 (`npm i -g pnpm@10`), Docker Desktop, và Doppler CLI (tùy chọn).

```bash
pnpm install
pnpm test                         # unit test mọi package
pnpm --filter @jobhunt/api test:e2e
pnpm --filter @jobhunt/api dev    # API ở http://localhost:3000
pnpm --filter @jobhunt/dashboard dev
pnpm --filter @jobhunt/mobile dev # mở bằng Expo Go
pnpm up                           # chạy cả stack bằng Docker Compose
```

Thử phân loại:

```bash
curl -X POST http://localhost:3000/classification/preview -H "content-type: application/json" -d "{\"text\":\"Tuyển DevOps Engineer 1 năm\"}"
```

## Secrets (Doppler)

1. Tạo project `jobhunt` trên Doppler, config `dev`.
2. `doppler login` rồi `doppler setup` trong thư mục repo (đọc `doppler.yaml`).
3. Chạy có secret: `doppler run -- pnpm --filter @jobhunt/api dev`.

Danh sách biến xem trong `.env.example`. Không commit `.env`.

## Dữ liệu cá nhân

Repo public. Tracker, CV, fixture thật và mọi thứ trong `data/` hoặc `fixtures-private/` đã nằm trong `.gitignore`, không commit.
