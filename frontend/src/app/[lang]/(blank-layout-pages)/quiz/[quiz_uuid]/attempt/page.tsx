"use client";
import api from "@/utils/axios"
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Cx() {
    const [redirected, setRedirected] = useState(false);
    const params = useParams();
    const [data, setData] = useState()
    const router = useRouter();

    const onLoad = async function () {
        const res = await api.post("/quiz/" + params.quiz_uuid + "/attempt")
        setData(res?.data);
    }
    useEffect(() => {
        onLoad();

    }, [])

    useEffect(() => {
        if (!redirected && data?.quiz_attempt_uuid) {
            setRedirected(true);
              setTimeout(() => {

          window.location.href =
"/quiz/attempt/" + data.quiz_attempt_uuid;

        }, 0);
        }
    }, [data?.quiz_attempt_uuid, redirected, router]);
    return <>Start to attempt Quiz ID : {params.quiz_uuid}</>
}