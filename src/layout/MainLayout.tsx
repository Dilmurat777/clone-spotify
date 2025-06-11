import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Outlet } from 'react-router-dom';
import LeftSidebar from './components/LeftSidebar';

const MainLayout = () => {
  const isMobile = false;
  return (
    <div className="flex flex-col h-screen text-white bg-black">
      <ResizablePanelGroup direction='horizontal' className="flex-1 flex h-full overflow-hidden p-2">
        {/* Left Slider */}
        <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
          <LeftSidebar />
        </ResizablePanel>

		<ResizableHandle className='w-2 bg-black rounded-lg transition-colors'/>

        {/* Main Content Area */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>
        {/* Right Slider */}
		<ResizableHandle className='w-2 bg-black rounded-lg transition-colors'/>

        <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
          friends activity
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;
