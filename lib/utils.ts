import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBasePath() {
  // 커스텀 도메인(루트 경로) 사용을 위해 basePath 제거
  return ""
}
