// app/admin/page.jsx
import AdminPageClient from '@/components/AdminPageClient'
import supabase from '@/lib/supabase'

export default async function AdminPage() {
  const { data: studentsData, error: studentError } = await supabase
    .from('students')
    .select('id, full_name')
    .order('full_name')

  const { data: scoresData, error: scoreError } = await supabase
    .from('student_scores')
    .select('*')

  if (studentError || scoreError) {
    return <p className="text-red-600">Veriler yüklenirken hata oluştu.</p>
  }

  return <AdminPageClient initialStudents={studentsData ?? []} initialScores={scoresData ?? []} />
}