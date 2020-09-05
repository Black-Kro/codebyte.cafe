import { useMutation } from '@black-kro/use-apollo';
import { GET_INVITES } from '/~/apollo/query';
import { CREATE_INVITES, DELETE_INVITE } from '/~/apollo/mutation';
import { useDialog } from '@black-kro/ui';

export const useAdmin = () => {

    const { createDialog } = useDialog();

    const { mutate: createInviteMutation } = useMutation(CREATE_INVITES, {
        update(cache, { data }) {
            const { invites } = cache.readQuery({ query: GET_INVITES }) as any;

            cache.writeQuery({
                query: GET_INVITES,
                data: {
                    invites: {
                        ...invites,
                        nodes: [
                            ...data.generateInviteCode,
                            ...invites.nodes,
                        ]
                    }
                }
            })
        }
    });

    const { mutate: deleteInviteMutation } = useMutation(DELETE_INVITE, {
        update(cache, { data }) {
            const { invites } = cache.readQuery({ query: GET_INVITES }) as any;
            console.log(invites.nodes);
            console.log(invites.nodes.filter(n => n.id !== data.deleteInviteCod));
            cache.writeQuery({
                query: GET_INVITES,
                data: {
                    invites: {
                        ...invites,
                        nodes: invites.nodes.filter(n => n.id !== data.deleteInviteCode)
                    }
                }
            })
        }
    });

    const createInvites = async (amount: number, roles: string[]) => {
        try {
            await createInviteMutation({ codesCount: amount, initialRoles: roles });
        } catch (error) {
            createDialog({
                title: 'Error Creating Invites',
                message: `There was an error creating invites. See error ${error}`
            })
        }
    };

    const deleteInvite = async (id: string) => {
        await deleteInviteMutation({ id });
    };

    return {
        createInvites,
        deleteInvite,
    }

}
