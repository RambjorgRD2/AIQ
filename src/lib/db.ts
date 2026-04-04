import { supabase } from './supabase'

// ── Row types ────────────────────────────────────────────────────────────────

export interface LessonProgressRow {
  id: string
  user_id: string
  lesson_id: string
  course_id: string
  completed_at: string
}

export interface AssessmentResultRow {
  id: string
  user_id: string
  score: number
  tier: string
  tier_label: string
  radar_data: Record<string, unknown> | null
  completed_at: string
}

export interface ReflectionNoteRow {
  id: string
  user_id: string
  lesson_id: string
  note_text: string
  updated_at: string
}

// ── Write helpers ────────────────────────────────────────────────────────────

/** Upsert a lesson completion row. Idempotent — safe to call multiple times. */
export async function upsertLessonProgress({
  userId,
  lessonId,
  courseId,
}: {
  userId: string
  lessonId: string
  courseId: string
}): Promise<void> {
  const { error } = await supabase
    .from('lesson_progress')
    .upsert(
      { user_id: userId, lesson_id: lessonId, course_id: courseId },
      { onConflict: 'user_id,lesson_id' }
    )
  if (error) {
    console.error('[db] upsertLessonProgress error:', error.message)
    throw error
  }
}

/** Insert a new assessment result row (each attempt is a separate row). */
export async function upsertAssessmentResult({
  userId,
  score,
  tier,
  tierLabel,
  radarData,
}: {
  userId: string
  score: number
  tier: string
  tierLabel: string
  radarData?: Record<string, unknown>
}): Promise<void> {
  const { error } = await supabase
    .from('assessment_results')
    .insert({
      user_id: userId,
      score,
      tier,
      tier_label: tierLabel,
      radar_data: radarData ?? null,
    })
  if (error) {
    console.error('[db] upsertAssessmentResult error:', error.message)
    throw error
  }
}

/** Upsert a reflection note. Idempotent — overwrites existing note for the same lesson. */
export async function upsertReflectionNote({
  userId,
  lessonId,
  noteText,
}: {
  userId: string
  lessonId: string
  noteText: string
}): Promise<void> {
  const { error } = await supabase
    .from('reflection_notes')
    .upsert(
      { user_id: userId, lesson_id: lessonId, note_text: noteText, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,lesson_id' }
    )
  if (error) {
    console.error('[db] upsertReflectionNote error:', error.message)
    throw error
  }
}

// ── Read helpers ─────────────────────────────────────────────────────────────

/** Returns the array of lesson_id strings the user has completed for a given course. */
export async function getCompletedLessons(
  userId: string,
  courseId: string
): Promise<string[]> {
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('lesson_id')
    .eq('user_id', userId)
    .eq('course_id', courseId)
  if (error) {
    console.error('[db] getCompletedLessons error:', error.message)
    throw error
  }
  return (data ?? []).map((row: { lesson_id: string }) => row.lesson_id)
}

/** Returns the most recent assessment result row for the user, or null if none. */
export async function getLatestAssessmentResult(
  userId: string
): Promise<AssessmentResultRow | null> {
  const { data, error } = await supabase
    .from('assessment_results')
    .select('*')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false })
    .limit(1)
    .single()
  if (error) {
    // PostgREST returns PGRST116 when no rows match — treat as null, not an error
    if (error.code === 'PGRST116') return null
    console.error('[db] getLatestAssessmentResult error:', error.message)
    throw error
  }
  return data as AssessmentResultRow
}

/** Returns the stored reflection note text for a lesson, or null if none. */
export async function getReflectionNote(
  userId: string,
  lessonId: string
): Promise<string | null> {
  const { data, error } = await supabase
    .from('reflection_notes')
    .select('note_text')
    .eq('user_id', userId)
    .eq('lesson_id', lessonId)
    .single()
  if (error) {
    if (error.code === 'PGRST116') return null
    console.error('[db] getReflectionNote error:', error.message)
    throw error
  }
  return (data as { note_text: string } | null)?.note_text ?? null
}
