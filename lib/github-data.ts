export type HeatmapValue = {
  date: string; // YYYY-MM-DD
  value: number;
};

function getDeterministicValue(dateStr: string): number {
  // Simple seed hash based on date string
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = dateStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const val = Math.abs(hash % 100);
  if (val > 88) {
    return Math.abs(hash % 8) + 1; // 1 to 8 commits
  } else if (val > 70) {
    return Math.abs(hash % 3) + 1; // 1 to 3 commits
  }
  return 0; // 0 commits
}

export function generateGithubMockData(startDate: Date, endDate: Date): HeatmapValue[] {
  const data: HeatmapValue[] = [];
  const curr = new Date(startDate);
  
  while (curr <= endDate) {
    const y = curr.getFullYear();
    const m = String(curr.getMonth() + 1).padStart(2, "0");
    const d = String(curr.getDate()).padStart(2, "0");
    const dateStr = `${y}-${m}-${d}`;
    const value = getDeterministicValue(dateStr);
    
    data.push({ date: dateStr, value });
    curr.setDate(curr.getDate() + 1);
  }
  
  return data;
}
