import { Loader } from '@/components/common/loader';
import { useFilm } from '@/components/hooks/useFilm';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { GenreCard } from '@/components/common/genrecard';
import { TorrentCard } from '@/components/common/torrentcard';
import CommentList from '@/components/common/commentlist';
import CommentForm from '@/components/common/commentform';
import { useEffect, useState } from 'react'

export default function FilmComponent() {

  const router = useRouter();
  const id = router.query.id;

  const noDescription = "There could be a description of the movie here, but unfortunately we didn't find it ;(";

  const localStorageKey = `comments_${id}`;

  const getCommentsFromLocalStorage = (): string[] => {
    const storedComments = localStorage.getItem(localStorageKey);
    return storedComments ? JSON.parse(storedComments) : [];
  };

  const [comments, setComments] = useState([])
  useEffect(() => {
    const storedComments = getCommentsFromLocalStorage();
    setComments(storedComments);
  }, [router]);

  const setCommentsToLocalStorage = (comments: string[]) => {
    localStorage.setItem(localStorageKey, JSON.stringify(comments));
  };
  
  const handleCommentSubmit = (newComment: { id: number; name: string; text: string; rating: number }) => {
    const existingComments = getCommentsFromLocalStorage();
    const updatedComments = [...existingComments, newComment];
    setCommentsToLocalStorage(updatedComments);
    setComments(updatedComments);
  };

  const { filmRetrieve, updateFilm, isSuccess, isLoading, isError, } = useFilm(Number(id));
  
  if (isLoading) return <div style={{position: 'absolute', left: '50%', top: '50%'}}><Loader/></div>

  if (isError) return <div>An error has occurred</div>

  const genres = filmRetrieve?.data.movie.genres.map((genre) =>
  <GenreCard genreName={genre}></GenreCard>
  )

  const torrents = filmRetrieve?.data.movie.torrents.map((torrent) =>
  <TorrentCard url={torrent.url} quality={torrent.quality} size={torrent.size}></TorrentCard>
  )

  function getRatingColor(rating: number) {
    if (rating === 0) {
      return 'hsl(0, 0%, 100%)';
    }
    const normalizedRating = Math.min(Math.max(rating / 10, 0), 1);
  
    const hue = Math.floor(0 + normalizedRating * 120);
    const saturation = 100;
    const lightness = 50;
  
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  const handleDeleteComment = (commentId: number) => {
    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    setCommentsToLocalStorage(updatedComments);
    setComments(updatedComments);
  };

  const noComments = (
  <div className = "flex justify-center text-center text-lg md:text-2xl lg:text-4xl my-8">There are no comments here yet, be the first!</div>
  )

  const haveComments = (
    <div className = "flex justify-center text-center text-lg md:text-2xl lg:text-4xl my-8">Let's see what the others think:</div>
  )

  return (
    <div className='text-slate-200'>
      <div className='flex justify-center md:justify-end'>
        <Link href={`/`} className='border-solid text-2xl border-orange-400 border-4 my-2 mx-8 px-16 py-2 rounded-xl'>
          Back
        </Link>
      </div>
      <div className='block md:flex'>
        <div>
        <div className='flex justify-center w-80 border-solid mx-auto md:mx-16 my-2 border-orange-400 border-4 rounded-xl overflow-hidden' style={{maxHeight : '475px'}}>
          <Image src={filmRetrieve?.data.movie.large_cover_image} alt="Error load image" height={475} width={350}></Image>
        </div>
          <div className={`grid ${torrents?.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} justify-items-center`}>
            {torrents}
          </div>
        </div>
        <div className='text-center md:text-left'>
          <div className='text-4xl mx-8 my-4'>{filmRetrieve?.data.movie.title_long}</div>
          <div className='text-2xl mx-8 my-2' style={{color : getRatingColor(Number(filmRetrieve?.data.movie.rating))}}>Movie language: {filmRetrieve?.data.movie.language}; Rating: {filmRetrieve?.data.movie.rating}</div>
          <div className='text-lg mx-8 my-4'>{filmRetrieve?.data.movie.description_full ? filmRetrieve?.data.movie.description_full : noDescription}</div>
          <div className={`grid ${genres?.length === 1 ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'} justify-items-center`}>
            {genres}
          </div>
        </div>
      </div>
      <CommentForm onCommentSubmit={handleCommentSubmit} />
      <div>
        {comments.length != 0 ? haveComments : noComments}
        <CommentList comments={comments} onDeleteComment={handleDeleteComment} />
      </div>
    </div>
  )
}
