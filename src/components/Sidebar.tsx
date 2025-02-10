import { currentUser } from '@clerk/nextjs/server'
import NotAuthenticated from './NotAuthenticated';
import { getUserByClearId } from '@/actions/user.actions';

const Sidebar = async () => {

    const authUser = await currentUser();

    if (!authUser) {
        return <NotAuthenticated />
    }

    const user = await getUserByClearId(authUser.id);
    if (!user) {
        return null
    }

    console.log({ user });

    return (
        <div>Sidebar</div>
    )
}

export default Sidebar