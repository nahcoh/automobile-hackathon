"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Home } from "lucide-react"

export default function ApplicationSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0 bg-gradient-to-br from-white via-white to-blue-50/30 backdrop-blur-sm">
        <CardHeader className="text-center py-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
          <div className="space-y-4">
            <div className="inline-block p-4 bg-white/20 rounded-full backdrop-blur-sm">
              <CheckCircle className="h-16 w-16" />
            </div>
            <CardTitle className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              신청 완료
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-8 md:p-12 text-center space-y-8">
          <p className="text-2xl font-bold text-gray-700">
            AutoHack 2025 참가 신청서가 성공적으로 제출되었습니다.
          </p>
          <p className="text-lg text-gray-600">
            팀원 모두에게 곧 안내 이메일이 발송될 예정입니다. 지원해주셔서 감사합니다!
          </p>
          <div className="flex justify-center pt-4">
            <Link href="/" passHref>
              <Button
                size="lg"
                className="px-12 py-4 text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-xl rounded-xl transform hover:scale-105 transition-all duration-200"
              >
                <Home className="h-6 w-6 mr-2" />
                메인으로 돌아가기
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
