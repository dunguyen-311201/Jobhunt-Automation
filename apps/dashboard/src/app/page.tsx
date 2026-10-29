const SECTIONS = [
  'Nguồn: nhóm Facebook, job site, link lẻ (Phase 2)',
  'Cài đặt mảng: Theo dõi / Ẩn / Bỏ qua (Phase 1)',
  'Tiêu chí "Hợp với tôi" và rule phân loại (Phase 1)',
  'Lịch sử quét và chi phí token (Phase 2)',
  'Tracker ứng tuyển (Phase 1)',
];

export default function Home() {
  return (
    <main>
      <h1>JobHunt Dashboard</h1>
      <p>Khung Phase 0. Các mục sẽ được thêm theo roadmap:</p>
      <ul>
        {SECTIONS.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </main>
  );
}
