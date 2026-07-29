import React, { useState } from 'react';
import { CourseModule, CourseQuiz } from '../../types/academy';
import { X, CheckCircle2, XCircle, HelpCircle, Award, RotateCcw, ArrowRight } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface QuizRunnerModalProps {
  module: CourseModule;
  onClose: () => void;
  onQuizPassed: (quizId: string, scorePercent: number) => void;
}

export const QuizRunnerModal: React.FC<QuizRunnerModalProps> = ({
  module,
  onClose,
  onQuizPassed
}) => {
  const { addToast } = useToast();
  const quiz: CourseQuiz = module.quiz || {
    id: 'quiz_demo',
    title: 'Module Quiz',
    description: 'Knowledge check',
    passingScorePercent: 80,
    questions: [
      {
        id: 'q1',
        question: 'Which visual aspect ratio is optimal for short-form clips on TikTok and Shorts?',
        options: ['16:9', '1:1', '9:16', '4:3'],
        correctAnswerIndex: 2,
        explanation: '9:16 vertical video occupies the full smartphone screen.'
      }
    ]
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const currentQ = quiz.questions[currentQuestionIndex];
  const totalQ = quiz.questions.length;

  const handleSelectOption = (optIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestionIndex]: optIndex }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        correctCount++;
      }
    });
    return Math.round((correctCount / totalQ) * 100);
  };

  const handleSubmitQuiz = () => {
    setSubmitted(true);
    const score = calculateScore();
    const passed = score >= quiz.passingScorePercent;

    if (passed) {
      addToast(`🎉 Quiz Passed! You scored ${score}%.`, 'success');
      onQuizPassed(quiz.id, score);
    } else {
      addToast(`You scored ${score}%. Passing threshold is ${quiz.passingScorePercent}%. Try again!`, 'warning');
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setCurrentQuestionIndex(0);
  };

  const scorePercent = submitted ? calculateScore() : 0;
  const isPassed = scorePercent >= quiz.passingScorePercent;

  return (
    <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              {module.title}
            </span>
            <h3 className="text-lg font-heading font-extrabold text-slate-900 dark:text-white">
              {quiz.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          /* Active Quiz View */
          <div className="space-y-6">
            {/* Progress Step */}
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>Question {currentQuestionIndex + 1} of {totalQ}</span>
              <span>Pass Score: {quiz.passingScorePercent}%</span>
            </div>

            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / totalQ) * 100}%` }}
              />
            </div>

            {/* Question Box */}
            <div className="space-y-4">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-heading">
                {currentQ.question}
              </h4>

              <div className="space-y-2.5">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full p-3.5 rounded-2xl text-left text-xs font-semibold flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-md border-transparent'
                          : 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{option}</span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-white bg-white text-indigo-600 font-bold' : 'border-slate-400'}`}>
                        {isSelected && '✓'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((i) => i - 1)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs disabled:opacity-40"
              >
                Previous
              </button>

              {currentQuestionIndex < totalQ - 1 ? (
                <button
                  disabled={selectedAnswers[currentQuestionIndex] === undefined}
                  onClick={() => setCurrentQuestionIndex((i) => i + 1)}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md disabled:opacity-50"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  disabled={Object.keys(selectedAnswers).length < totalQ}
                  onClick={handleSubmitQuiz}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md disabled:opacity-50"
                >
                  <Award className="w-4 h-4" />
                  <span>Submit Quiz</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="text-center space-y-6 py-4">
            <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl font-extrabold shadow-lg ${
              isPassed ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-500 border border-rose-500/30'
            }`}>
              {scorePercent}%
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                {isPassed ? '🎉 Module Quiz Passed!' : 'Requires Retry'}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {isPassed
                  ? `Great job! You met the passing threshold of ${quiz.passingScorePercent}%.`
                  : `You scored ${scorePercent}%. You need at least ${quiz.passingScorePercent}% to pass.`}
              </p>
            </div>

            {/* Answer Explanations */}
            <div className="space-y-3 text-left max-h-60 overflow-y-auto p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              {quiz.questions.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctAnswerIndex;
                return (
                  <div key={idx} className="space-y-1 text-xs border-b border-slate-200 dark:border-slate-700 pb-2.5 last:border-none">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                      <span>{q.question}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 pl-5 leading-relaxed">
                      💡 {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleReset}
                className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Quiz</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
