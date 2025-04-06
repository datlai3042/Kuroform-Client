import { clearFormAnswer } from "@/app/_lib/redux/formAnswer.slice"
import FormAnswerService from "@/app/_services/formAnswer.service"
import { useMutation } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { string } from "zod"

const useDeleteOneReport = () => {
    const dispatch = useDispatch()

    const useDeleteOneReportHook = useMutation({
        mutationKey: ['delete-one-report'],
        mutationFn: ({ form_id, report_id }: { form_id: string, report_id: string }) => FormAnswerService.deleteOneReport({ form_id, report_id }),
        onSuccess: (res) => {
            const { formAnswer } = res.metadata
            dispatch(clearFormAnswer({ form_id: formAnswer.form_id }))
        }
    })


    return useDeleteOneReportHook
}

export default useDeleteOneReport