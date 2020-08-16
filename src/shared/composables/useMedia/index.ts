import { useAxios } from '/@app/composables/';
import { useDialog } from '@black-kro/ui';

const MAX_SIZE = 1000;

const uploadMedia = (files: File | FileList | Blob | File[] | Blob[]) => {
    if (Array.isArray(files)) {
        if (files.length === 0)
            return [];

        return uploadMediaFromList(files);
    } else if (files instanceof FileList) {
        return uploadMediaFromList(Array.from(files));
    } else {
        return uploadMedia([files]);
    }
}

const uploadMediaFromList = async (files: File[] | Blob[], maxSize: number = MAX_SIZE) => {
    const formData = new FormData();
    const { post } = useAxios();

    for (const file of files) {
        formData.append('images', file);
    }

    try {
        const { data } = await post('api/media/upload/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
        
        if (data.success) {
            return data.mediaIds;
        } else {
            throw Error(`Failed to upload media: ${data}`);
        }

    } catch (error) {
        console.error(error);
        const { createDialog } = useDialog();

        createDialog({
            title: 'Upload Failed',
            message: 'Sorry about this, there was an error uploading your images. If you are a developer, check the browser console for any error messages.',
            icon: 'error',
            style: 'centered',
            resolveButton: {
                text: 'Close',
            },
            rejectButton: {
                text: 'Close',
                hidden: true,
            }
        })
    }
};

export const useMedia = () => {

    return {
        uploadMedia,
    }

};