import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBasePath() {
  const isProd = process.env.NODE_ENV === "production"
  return isProd ? "/pnpHealth_web" : ""
}
