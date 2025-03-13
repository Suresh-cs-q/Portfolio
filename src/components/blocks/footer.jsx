import * as React from "react"
import { cn } from "../../lib/utils"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <p>📧 Email: Suresh.manghwar@gmail.com</p>
              <p>📍 Location: Lahore, Pakistan</p>
              <p>📞 Phone: +92 313 1136263</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Social Links</h3>
            <div className="space-y-2">
              <a
                href="https://linkedin.com/in/sureshkumar-cs"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-primary transition-colors"
              >
                🌐 LinkedIn
              </a>
              <a
                href="https://github.com/Suresh-cs-q"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-primary transition-colors"
              >
                🐙 GitHub
              </a>
              <a
                href="https://leetcode.com/u/Sureshiba"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-primary transition-colors"
              >
                📝 LeetCode
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="#projects" className="block hover:text-primary transition-colors">
                Projects
              </a>
              <a href="#experience" className="block hover:text-primary transition-colors">
                Experience
              </a>
              <a href="#skills" className="block hover:text-primary transition-colors">
                Skills
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © 2025 Suresh Kumar. All rights reserved.
        </div>
      </div>
    </footer>
  )
} 