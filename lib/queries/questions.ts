import * as questionsApi from "@/lib/api/questions";

import { useQuery, useMutation } from "@tanstack/react-query";

export const useQuestions = ({ page = 1 }: { page?: number }) => {
  return useQuery({
    queryKey: ["questions", page],
    queryFn: () => questionsApi.getQuestions(page),
  });
};

export const useAddQuestion = () => {
  return useMutation({
    mutationFn: questionsApi.addQuestion,
  });
};

export const useRemoveQuestion = () => {
  return useMutation({
    mutationFn: questionsApi.removeQuestion,
  });
};

export const useQuestionById = (id: number) => {
  return useQuery({
    queryKey: ["question", id],
    queryFn: () => questionsApi.getQuestionById(id),
    enabled: !!id,
  });
};

export const useAddQuestionAnswer = () => {
  return useMutation({
    mutationFn: questionsApi.addQuestionAnswer,
  });
};

export const useQuestionAnswers = (id: number) => {
  return useQuery({
    queryKey: ["question-answers", id],
    queryFn: () => questionsApi.getQuestionAnswers(id),
    enabled: !!id,
  });
};
