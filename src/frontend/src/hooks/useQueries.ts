import { useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubmitInquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (params: {
      schoolName: string;
      contactPerson: string;
      email: string;
      phone: string;
      preferredDates: string;
      groupSize: number;
      curriculumBoard: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitInquiry(
        params.schoolName,
        params.contactPerson,
        params.email,
        params.phone,
        params.preferredDates,
        BigInt(params.groupSize),
        params.curriculumBoard,
        params.message,
      );
    },
  });
}
