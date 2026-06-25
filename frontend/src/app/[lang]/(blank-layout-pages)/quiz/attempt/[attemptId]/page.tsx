"use client";

import api from "@/utils/axios";
import { Button, Card, CardContent, CardHeader, Grid2 } from "@mui/material";
import { useEffect, useState } from "react";
import { use } from "react";
import Grid from '@mui/material/Grid2'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'
import classnames from 'classnames'
import Link from "next/link";
import QuizTimer from "../QuizTimer";
// format waktu
const formatTime = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}
const PanelQuestion = ({ selectedQuestion, setSelectedQuestion }) => {

  const updateLocalAnswer = function (answer) {
    if (selectedQuestion) {
      selectedQuestion.answer = answer
    }

    setSelectedQuestion({ ...selectedQuestion })
  }
  const onSetAnswer = async (answer) => {
    const res = await api.post('/quiz-question/' + selectedQuestion.uuid + "/set-answer", {
      answer: answer
    });

    if (res.status === 200) {
      console.log('Berhasil')
      updateLocalAnswer(answer)
    }
  }


  return <><></>

    <Card>

      <CardContent>
        {!selectedQuestion && <>Pilih Pertanyaan d samping...</>}
        {selectedQuestion &&
          <>{selectedQuestion?.question?.name}
            <br></br>
            {selectedQuestion?.question?.options.map(function (o, keyo) {
              return <Button onClick={() => {
                onSetAnswer(o.id)
                //setAnsweredOptions(o.id)
              }} variant='contained' color={selectedQuestion.answer == o.id ? "warning" : ""} className='whitespace-nowrap  mr-2 mb-2' size="small" key={keyo}>{o?.name}</Button>
            })}
          </>
        }
        <hr />

      </CardContent>
    </Card></>
}
const BoardQuestions = ({ questions, setSelectedQuestion, selectedQuestion }) => {
  return questions?.map(function (r, key) {
    return <Button key={key + 1} onClick={() => {
      window.location.hash = 'qid=' + r.uuid
      setSelectedQuestion(r)
    }}
      variant='contained'
      color={r.answer ? "warning" : "primary"}
      endIcon={r.uuid == setSelectedQuestion.uuid ? <i className='tabler-pencil' /> : ""}
      className='whitespace-nowrap  mr-2 mb-2'
      target='_blank' size="small">{key + 1}</Button>
  });
}
export default function Page({ params }: { params: Promise<{ attemptId: string }> }) {
  const [startTime, setStartTime] = useState();
  const [duration, setDuration] = useState();

  const { attemptId } = use(params);
  const [questions, setQuestions] = useState()
  const [selectedQuestion, setSelectedQuestion] = useState();
  const loadQuizAttempt = async function () {
    const res = await api.get("/quiz-attempt/" + attemptId)
    localStorage.setItem(
      'quiz_attempt_' + attemptId,
      JSON.stringify(res.data)
    )
    setStartTime(res?.data?.quiz_attempt?.start_time)
    setDuration(res?.data?.quiz_attempt?.duration)
    setQuestions(res?.data?.quiz_attempt?.quiz_questions)
  }

  const [qid, setQid] = useState('')


  useEffect(() => {
    console.log("update selectedQuestion");
    console.log(selectedQuestion);
  }, [selectedQuestion])
  useEffect(() => {
    const updateHash = () => {
      const params = new URLSearchParams(
        window.location.hash.substring(1)
      )

      setQid(params.get('qid') || '')
    }

    updateHash()

    window.addEventListener('hashchange', updateHash)

    return () => {
      window.removeEventListener('hashchange', updateHash)
    }
  }, [])

  useEffect(() => {
    if (qid && questions) {
      const question = questions.find((r) => r.uuid == qid);
      setSelectedQuestion(question)
    }
  }, [qid, questions])
  useEffect(() => {
    loadQuizAttempt();
  }, [])
  return <section className={classnames('md:plb-[100px] plb-6', frontCommonStyles.layoutSpacing)}>

    <Card>
      <CardHeader title={<QuizTimer start_time={startTime} duration={duration} />}>

      </CardHeader>
      <CardContent>
        <Grid container spacing={6}>
          <Grid size={{ xs: 6 }}>

            <PanelQuestion setSelectedQuestion={setSelectedQuestion} selectedQuestion={selectedQuestion}></PanelQuestion>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <BoardQuestions attempt_uuid={attemptId} setSelectedQuestion={setSelectedQuestion} selectedQuestion={selectedQuestion} questions={questions} setQuestions={setQuestions}></BoardQuestions>
          </Grid>

        </Grid>
      </CardContent>
    </Card>


  </section >
}