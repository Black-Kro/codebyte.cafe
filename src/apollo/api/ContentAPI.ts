import { useMutation } from '@black-kro/use-apollo';
import { GET_INVITES } from '/~/apollo/query';
import { CREATE_REPORT } from '/~/apollo/mutation';
import { useDialog } from '@black-kro/ui';
import { useToast } from '/~/composables';

export const useContent = () => {

    const { createDialog } = useDialog();
    const { createToast } = useToast();

    const { mutate: createReportMutation } = useMutation(CREATE_REPORT);

    const createContentReport = async (content: string, contentId: string, reportType: string) => {
        try {
            await createReportMutation({ content, contentId, reportType });
            createToast({
                title: 'Post Reported',
                message: 'This post has been reported and will be reviewed by moderators',
                icon: 'success',
                duration: 5,
            });
        } catch (error) {
            createDialog({
                title: 'Error Creating Report',
                message: error.message
            })
        }
    };

    return {
        createContentReport
    }

}
