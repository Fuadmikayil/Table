import ScoreTable from '@/components/ScoreTable'
import supabase from '@/lib/supabase'

export default async function JournalPage() {
  const { data: students } = await supabase
    .from('students')
    .select('id, full_name')
    .order('full_name')

  const { data: scores } = await supabase
    .from('student_scores')
    .select('*')

  return (
    <main className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Yoxlama Cədvəli</h1>
      <ScoreTable students={students ?? []} allScores={scores ?? []} />
    </main>
  )
}
