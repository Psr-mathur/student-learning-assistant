import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const LessonsPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate('/lessons/class-setup')}>
        Start a Lesson
      </Button>
    </div>
  )
}
