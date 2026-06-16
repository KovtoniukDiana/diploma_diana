import { getComments } from '@/src/actions/comments'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/app/api/auth/[...nextauth]/auth.config'
import CommentForm from './commentForm'
import CommentItem from './commentItem'

interface IProps {
    movieId: number
}

export default async function Comments({ movieId }: IProps) {
    const comments = await getComments(movieId)
    const session = await getServerSession(authConfig)

    return (
        <div className='flex flex-col gap-6'>
            <h3 className='text-2xl font-bold'>Коментарі</h3>

            {session?.user
                ? <CommentForm movieId={movieId} />
                : <p className='text-gray-500 text-sm'>Увійдіть щоб залишити коментар</p>
            }

            <div className='flex flex-col gap-4'>
                {comments.length === 0
                    ? <p className='text-gray-400'>Коментарів ще немає. Будьте першим!</p>
                    : comments.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            movieId={movieId}
                            currentUserId={session?.user?.email ?? null}
                        />
                    ))
                }
            </div>
        </div>
    )
}