import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

export default function Home(){
  const navigate = useNavigate();
  const go1 = () => navigate('/1');
  const go2 = () => navigate('/2');
  const go3 = () => navigate('/3');
  const bannerItem = [
    { title: '원룸/투룸', subTitle: '나에게 딱 맞는 원룸 찾기', data: '주변 모든 원룸을 더 쉽게<br />찾아보세요!', shape: 1, imgNumber: 1, onclick:{go1} },
    { title: '아파트', subTitle: '나에게 딱 맞는 아파트 찾기', data: '회원님에게 딱 맞는 아파트<br />매물을 찾아보세요!', shape: 1, imgNumber: 2, onclick:{go2} },
    { title: 'AI 맞춤 매물 추천을 통해 딱', subTitle: '나에게 딱 맞는 방 찾기', data: '', shape: 2, imgNumber: 3, onclick:{go3} },
  ];
  return(
    <div className="h-[545px] w-full pt-[78px] bg-[#F4FCFF] px52">
      
    </div>
  )
}