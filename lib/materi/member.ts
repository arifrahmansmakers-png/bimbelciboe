import { getCurrentUser } from "@/lib/auth";

import { getSubjects } from "@/lib/repository/subjectRepository";

export async function getSubjectsMember() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User belum login.");
  }

  if (!user.educationLevelId) {
    return [];
  }

  return getSubjects(
    user.educationLevelId
  );
}