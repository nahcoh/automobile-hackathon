'use client'

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Shield, Calendar, Trophy, Phone, Mail, Plus, Minus, User, School, MapPin, Loader2 } from "lucide-react"

interface Participant {
  university: string
  department: string
  name: string
  gender: string
  contact: string
  email: string
}

export default function AutoHackApplicationForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    teamName: "",
    teamLeaderName: "",
    participationReason: "",
    howDidYouKnow: [] as string[],
    hackingExperience: "",
    privacyConsent: false,
  })

  const [participants, setParticipants] = useState<Participant[]>([
    { university: "", department: "", name: "", gender: "", contact: "", email: "" },
  ])

  const addParticipant = () => {
    if (participants.length < 4) {
      setParticipants([
        ...participants,
        { university: "", department: "", name: "", gender: "", contact: "", email: "" },
      ])
    }
  }

  const removeParticipant = (index: number) => {
    if (participants.length > 1) {
      setParticipants(participants.filter((_, i) => i !== index))
    }
  }

  const formatDisplayPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 3) {
      return digits;
    }
    if (digits.length <= 7) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    }
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  };

  const updateParticipant = (index: number, field: keyof Participant, value: string) => {
    let formattedValue = value;
    if (field === 'contact') {
      formattedValue = formatDisplayPhoneNumber(value);
    }
    const updated = participants.map((p, i) => (i === index ? { ...p, [field]: formattedValue } : p));
    setParticipants(updated);
  }

  const learningPaths = [
    "대학교 공지사항",
    "교수님 추천",
    "친구/선배 소개",
    "SNS (인스타그램, 페이스북 등)",
    "온라인 커뮤니티",
    "관련 웹사이트",
    "기타",
  ]

  const toggleLearningPath = (path: string) => {
    setFormData((prev) => ({
      ...prev,
      howDidYouKnow: prev.howDidYouKnow.includes(path)
        ? prev.howDidYouKnow.filter((p) => p !== path)
        : [...prev.howDidYouKnow, path],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.privacyConsent) {
      alert("개인정보 제공에 동의해주세요.")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, participants }),
      });

      if (response.ok) {
        router.push('/success');
      } else {
        const errorData = await response.json();
        alert(`신청서 제출에 실패했습니다: ${errorData.error || '알 수 없는 오류'}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("네트워크 오류 또는 서버 문제로 제출에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white py-20 relative overflow-hidden">
        {/* Car circuit pattern background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-cyan-400 rounded-full backdrop-blur-sm border-2 border-cyan-400/30"></div>
          <div className="absolute top-20 right-20 w-24 h-24 border border-blue-400 rounded-lg rotate-45"></div>
          <div className="absolute bottom-10 left-1/4 w-16 h-16 border border-cyan-300 rounded-full"></div>
          <div className="absolute bottom-20 right-1/3 w-20 h-20 border border-blue-300 rounded-lg rotate-12"></div>
          {/* Circuit lines */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
        </div>

        {/* Car silhouette background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <img
            src="/modern-sports-car-silhouette-side-view-automotive-.jpg"
            alt="Car silhouette"
            className="w-full max-w-4xl h-auto"
          />
        </div>

        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center items-center gap-6 mb-8">
            {/* Enhanced shield icon with automotive elements */}
            <div className="relative">
              <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full backdrop-blur-sm border-2 border-cyan-400/30">
                <Shield className="h-20 w-20 text-cyan-300" />
              </div>
              {/* Small car icon overlay */}
              <div className="absolute -bottom-2 -right-2 p-2 bg-orange-500 rounded-full">
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent drop-shadow-2xl">
                AutoHack 2025
              </h1>
            </div>
          </div>
          <p className="text-3xl md:text-4xl mb-4 font-bold text-cyan-100 drop-shadow-lg">
            2025 자동차 해킹 방어 경진대회
          </p>
          <p className="text-xl mb-8 opacity-90 font-medium text-blue-100">
            국민대학교 첨단분야 혁신융합대학사업(미래자동차) CO-SHOW
          </p>
          <div className="inline-block bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-full px-8 py-3 border border-orange-400/30">
            <p className="text-lg font-bold text-orange-200">🏆 혁신적인 자동차 보안 기술의 미래를 만들어가세요</p>
          </div>

          {/* Additional automotive elements */}
          <div className="mt-8 flex justify-center gap-8 opacity-60">
            <div className="flex items-center gap-2 text-cyan-300">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">SECURITY</span>
            </div>
            <div className="flex items-center gap-2 text-blue-300">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
              <span className="text-sm font-medium">INNOVATION</span>
            </div>
            <div className="flex items-center gap-2 text-orange-300">
              <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
              <span className="text-sm font-medium">AUTOMOTIVE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-white to-blue-50/50 backdrop-blur-sm">
            <CardContent className="pt-8">
              <div className="space-y-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-100">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-blue-700">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Shield className="h-6 w-6" />
                    </div>
                    참가 신청서 작성 유의사항
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">⊙</span>
                      <span>최대 4인 1팀으로 구성해주세요. (팀원의 소속학교 및 학과가 다른 것도 가능)</span>
                    </li>
                    <li className="flex items-start gap-2 font-semibold text-orange-700">
                      <span className="text-orange-600 font-bold">⊙</span>
                      <span>성별 기재는 추후 본선대회 숙소 배정 등에 활용 예정입니다.</span>
                    </li>
                    <li className="flex items-start gap-2 font-semibold text-orange-700">
                      <span className="text-orange-600 font-bold">⊙</span>
                      <span>
                        연락가능한 연락처 및 이메일 주소는 숫자, 알파벳 등 오타에 유의하여 작성부탁드립니다. (메일로
                        안내예정)
                      </span>
                    </li>
                    <li className="flex items-start gap-2 font-semibold text-orange-700">
                      <span className="text-orange-600 font-bold">⊙</span>
                      <span>
                        본 조사를 통해 수집된 정보는 통계법 제33조 \'비밀의 보호 원칙\'에 따라 대회 운영을 위한
                        정보처리에만 사용되며, 임의로 공개되지 않음을 약속드립니다.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-green-100">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-green-700">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Calendar className="h-5 w-5" />
                      </div>
                      대회 일정
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">⊙</span>
                        <span>참가 신청: 2025.09.22.(월) ~ 10.10.(금) (온라인)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">⊙</span>
                        <span>CTF 예선대회: 2025.11.01.(토) (상세 일정 및 장소 추후 안내)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">⊙</span>
                        <span>예선 대회 결과 발표: 2025.11.07.(금) (팀별로 안내 예정)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">⊙</span>
                        <span>본선교육: 2025.11.15.(토) (상세 일정 및 장소 추후 안내)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">⊙</span>
                        <span>본선대회: 2025.11.26.(수)~11.28.(금) (부산 BEXCO)</span>
                      </li>
                      <li className="flex items-start gap-2 font-semibold text-red-600">
                        <span className="text-red-600 font-bold">※</span>
                        <span>위 일정에 팀원 전원 참석 필수(부득이한 사유로 불참일 경우, 따로 연락)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-100">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-yellow-700">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Trophy className="h-5 w-5" />
                      </div>
                      대회 상훈
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2 font-semibold text-yellow-800">
                        <span className="text-yellow-600 font-bold">🥇</span>
                        <span>1등: 대상(교육부장관상)</span>
                      </li>
                      <li className="flex items-start gap-2 font-semibold text-gray-600">
                        <span className="text-gray-500 font-bold">🥈</span>
                        <span>2등: 최우수상(부산시장상)</span>
                      </li>
                      <li className="flex items-start gap-2 font-semibold text-orange-600">
                        <span className="text-orange-500 font-bold">🥉</span>
                        <span>3등: 우수상(연구재단 이사장상)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">🏆</span>
                        <span>4등: 장려상(첨단분야 혁신융합대학 협의회장상)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">⭐</span>
                        <span>5등: 특별상(아우토크립트상, 이타스코리아상)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
                  <h4 className="font-bold mb-3 flex items-center gap-3 text-blue-700">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Phone className="h-4 w-4" />
                    </div>
                    문의처
                  </h4>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">국민대학교 미래자동차사업단 김빛나라</p>
                    <p className="text-sm flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-600" />
                      bn120249@kookmin.ac.kr / 02-910-6681
                    </p>
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <p className="text-sm font-semibold text-blue-800">첨단분야 혁신융합대학사업(미래자동차)</p>
                      <p className="text-sm">- 홈페이지: https://coss.kookmin.ac.kr/fvedu/</p>
                      <p className="text-sm">- 인스타그램: @kmu-coss</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-0 bg-gradient-to-br from-white via-white to-blue-50/30 backdrop-blur-sm">
            <CardHeader className="text-center py-12 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg">
              <div className="space-y-4">
                <div className="inline-block p-4 bg-white/20 rounded-full backdrop-blur-sm">
                  <Shield className="h-12 w-12" />
                </div>
                <CardTitle className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                  참가 신청서
                </CardTitle>
                <CardDescription className="text-2xl md:text-3xl font-bold text-white/90">
                  AutoHack 2025 (2025 자동차 해킹 방어 경진대회) 참가 신청서
                </CardDescription>
                <div className="w-24 h-1 bg-white/50 mx-auto rounded-full"></div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-10">
                <Card className="border-2 border-blue-100 shadow-lg bg-gradient-to-r from-white to-blue-50/30">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400"></div>
                    <div className="absolute top-1 left-4 w-8 h-8 bg-blue-200/30 rounded-full"></div>
                    <div className="absolute top-2 right-8 w-6 h-6 bg-cyan-200/30 rounded-full"></div>
                    <CardTitle className="text-2xl flex items-center gap-3 text-blue-700 pt-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <User className="h-6 w-6" />
                      </div>
                      팀 정보
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 p-8">
                    <div className="space-y-2">
                      <Label htmlFor="teamName" className="text-lg font-semibold text-gray-700">
                        팀명 *
                      </Label>
                      <Input
                        id="teamName"
                        value={formData.teamName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, teamName: e.target.value }))}
                        required
                        placeholder="팀명을 입력해주세요"
                        className="h-12 text-lg border-2 border-blue-200 focus:border-blue-400 rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="teamLeaderName" className="text-lg font-semibold text-gray-700">
                        팀장 성명 *
                      </Label>
                      <Input
                        id="teamLeaderName"
                        value={formData.teamLeaderName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, teamLeaderName: e.target.value }))}
                        required
                        placeholder="팀장 성명을 입력해주세요"
                        className="h-12 text-lg border-2 border-blue-200 focus:border-blue-400 rounded-lg"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-100 shadow-lg bg-gradient-to-r from-white to-green-50/30">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-green-400"></div>
                    <div className="absolute top-1 left-6 w-6 h-6 bg-green-200/30 rounded-full"></div>
                    <div className="absolute top-2 right-12 w-8 h-8 bg-emerald-200/30 rounded-full"></div>
                    <CardTitle className="text-2xl flex items-center justify-between text-green-700 pt-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <School className="h-6 w-6" />
                        </div>
                        참여자 정보
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addParticipant}
                          disabled={participants.length >= 4}
                          className="flex items-center gap-2 border-2 border-green-200 hover:bg-green-50"
                        >
                          <Plus className="h-4 w-4" />
                          참여자 추가
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8 p-8">
                    {participants.map((participant, index) => (
                      <div
                        key={index}
                        className="space-y-6 p-6 border-2 border-gray-100 rounded-xl bg-gradient-to-r from-white to-gray-50/50"
                      >
                        <div className="flex items-center justify-between">
                          <h4
                            className={`text-xl font-bold flex items-center gap-2 ${index === 0 ? "text-green-600" : "text-gray-600"}`}
                          >
                            <div className={`p-2 rounded-lg ${index === 0 ? "bg-green-100" : "bg-gray-100"}`}>
                              <User className="h-5 w-5" />
                            </div>
                            참여자 {index + 1} {index === 0 ? "(필수)" : "(선택)"}
                          </h4>
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeParticipant(index)}
                              className="flex items-center gap-2 text-red-600 hover:text-red-700 border-2 border-red-200 hover:bg-red-50"
                            >
                              <Minus className="h-4 w-4" />
                              삭제
                            </Button>
                          )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label
                              htmlFor={`participant${index + 1}University`}
                              className="font-semibold text-gray-700"
                            >
                              소속대학 {index === 0 ? "*" : ""}
                            </Label>
                            <Input
                              id={`participant${index + 1}University`}
                              value={participant.university}
                              onChange={(e) => updateParticipant(index, "university", e.target.value)}
                              required={index === 0}
                              placeholder="예: 국민대학교"
                              className="h-11 border-2 border-gray-200 focus:border-green-400 rounded-lg"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor={`participant${index + 1}Department`}
                              className="font-semibold text-gray-700"
                            >
                              소속학과 {index === 0 ? "*" : ""}
                            </Label>
                            <Input
                              id={`participant${index + 1}Department`}
                              value={participant.department}
                              onChange={(e) => updateParticipant(index, "department", e.target.value)}
                              required={index === 0}
                              placeholder="예: 자동차공학과"
                              className="h-11 border-2 border-gray-200 focus:border-green-400 rounded-lg"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`participant${index + 1}Name`} className="font-semibold text-gray-700">
                              이름 {index === 0 ? "*" : ""}
                            </Label>
                            <Input
                              id={`participant${index + 1}Name`}
                              value={participant.name}
                              onChange={(e) => updateParticipant(index, "name", e.target.value)}
                              required={index === 0}
                              placeholder="예: 김국민"
                              className="h-11 border-2 border-gray-200 focus:border-green-400 rounded-lg"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`participant${index + 1}Gender`} className="font-semibold text-gray-700">
                              성별 {index === 0 ? "*" : ""}
                            </Label>
                            <RadioGroup
                              value={participant.gender}
                              onValueChange={(value) => updateParticipant(index, "gender", value)}
                              className="flex gap-6 pt-2"
                              required={index === 0}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="남"
                                  id={`participant${index + 1}Male`}
                                  className="border-2 border-green-300"
                                />
                                <Label htmlFor={`participant${index + 1}Male`} className="font-medium cursor-pointer">
                                  남
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="여"
                                  id={`participant${index + 1}Female`}
                                  className="border-2 border-green-300"
                                />
                                <Label htmlFor={`participant${index + 1}Female`} className="font-medium cursor-pointer">
                                  여
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`participant${index + 1}Contact`} className="font-semibold text-gray-700">
                              연락처 {index === 0 ? "*" : ""}
                            </Label>
                            <Input
                              id={`participant${index + 1}Contact`}
                              value={participant.contact}
                              onChange={(e) => updateParticipant(index, "contact", e.target.value)}
                              required={index === 0}
                              placeholder="예: 010-1234-5678"
                              className="h-11 border-2 border-gray-200 focus:border-green-400 rounded-lg"
                              maxLength={13} // 010-1234-5678
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`participant${index + 1}Email`} className="font-semibold text-gray-700">
                              이메일 주소 {index === 0 ? "*" : ""}
                            </Label>
                            <Input
                              id={`participant${index + 1}Email`}
                              value={participant.email}
                              onChange={(e) => updateParticipant(index, "email", e.target.value)}
                              required={index === 0}
                              type="email"
                              placeholder="예: kookmin@kookmin.ac.kr"
                              className="h-11 border-2 border-gray-200 focus:border-green-400 rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-100 shadow-lg bg-gradient-to-r from-white to-purple-50/30">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400"></div>
                    <div className="absolute top-1 left-8 w-7 h-7 bg-purple-200/30 rounded-full"></div>
                    <div className="absolute top-2 right-6 w-5 h-5 bg-pink-200/30 rounded-full"></div>
                    <CardTitle className="text-2xl flex items-center gap-3 text-purple-700 pt-2">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <MapPin className="h-6 w-6" />
                      </div>
                      추가 정보
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8 p-8">
                    <div className="space-y-3">
                      <Label htmlFor="participationReason" className="text-lg font-semibold text-gray-700">
                        본 경진대회 참여하는 이유를 간략하게 기재해 주시기 바랍니다. *
                      </Label>
                      <Textarea
                        id="participationReason"
                        value={formData.participationReason}
                        onChange={(e) => setFormData((prev) => ({ ...prev, participationReason: e.target.value }))}
                        required
                        rows={5}
                        placeholder="참여 이유를 작성해주세요"
                        className="border-2 border-purple-200 focus:border-purple-400 rounded-lg text-base"
                      />
                    </div>

                    <div className="space-y-4">
                      <Label className="text-lg font-semibold text-gray-700">
                        본 경진대회를 알게 된 경로를 선택해 주시기 바랍니다. (복수 선택 가능) *
                      </Label>
                      <div className="grid md:grid-cols-2 gap-4">
                        {learningPaths.map((path) => (
                          <div
                            key={path}
                            className="flex items-center space-x-3 p-3 border-2 border-gray-100 rounded-lg hover:bg-purple-50 transition-colors"
                          >
                            <Checkbox
                              id={`path-${path}`}
                              checked={formData.howDidYouKnow.includes(path)}
                              onCheckedChange={() => toggleLearningPath(path)}
                              className="border-2 border-purple-300"
                            />
                            <Label htmlFor={`path-${path}`} className="font-medium cursor-pointer">
                              {path}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {formData.howDidYouKnow.includes("기타") && (
                        <div className="mt-4">
                          <Input
                            placeholder="기타 경로를 입력해주세요"
                            className="w-full h-11 border-2 border-purple-200 focus:border-purple-400 rounded-lg"
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="hackingExperience" className="text-lg font-semibold text-gray-700">
                        국내외 해킹 대회, 해킹 캠프, 관련 활동 등에 참여한 경험이 있다면 기재해주시기 바랍니다.
                      </Label>
                      <Textarea
                        id="hackingExperience"
                        value={formData.hackingExperience}
                        onChange={(e) => setFormData((prev) => ({ ...prev, hackingExperience: e.target.value }))}
                        rows={5}
                        placeholder="관련 경험이 있다면 작성해주세요"
                        className="border-2 border-purple-200 focus:border-purple-400 rounded-lg text-base"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-orange-100 shadow-lg bg-gradient-to-r from-white to-orange-50/30">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
                      <Checkbox
                        id="privacy"
                        checked={formData.privacyConsent}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, privacyConsent: checked as boolean }))
                        }
                        required
                        className="mt-1 border-2 border-orange-400"
                      />
                      <Label htmlFor="privacy" className="text-lg font-semibold leading-relaxed text-gray-700">
                        개인정보 제공에 동의하십니까? *
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-center pt-8">
                  <Button
                    type="submit"
                    size="lg"
                    className="px-16 py-4 text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-xl rounded-xl transform hover:scale-105 transition-all duration-200"
                    disabled={!formData.privacyConsent || isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-6 w-6 mr-2 animate-spin" />
                    ) : (
                      <Shield className="h-6 w-6 mr-2" />
                    )}
                    {isSubmitting ? '제출 중...' : '제출하기'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}