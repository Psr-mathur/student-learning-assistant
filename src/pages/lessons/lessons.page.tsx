import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const LessonsPage = () => {
  const navigate = useNavigate();
  return (
    <div className='flex justify-center items-center h-screen'>
      <Button onClick={() => navigate('/lessons/class-setup')}>
        Start Lesson
      </Button>
    </div>
  )
}
