
import React, { useState } from 'react';
import { useProposal } from '../../context/ProposalContext';
import { Button } from '../ui/button';
import { Loader2, Save, FolderOpen, History, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LoadProposalDialog from './LoadProposalDialog';
import { isSupabaseConnected } from '../../lib/supabase';

const ProposalActions: React.FC = () => {
  const { state, saveProposal } = useProposal();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);
  
  // Function to handle saving a proposal
  const handleSave = async () => {
    // Check if Supabase is connected
    if (!isSupabaseConnected()) {
      toast({
        title: "Supabase not connected",
        description: "Please connect to Supabase first by clicking the Supabase button in the top right corner.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSaving(true);
    try {
      console.log('Attempting to save proposal...');
      await saveProposal();
      toast({
        title: "Proposal saved!",
        description: `Successfully saved "${state.proposalTitle || 'Untitled Proposal'}"`,
      });
    } catch (error) {
      console.error("Save error:", error);
      toast({
        title: "Error saving proposal",
        description: "There was a problem saving your proposal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Function to show the load dialog
  const handleLoad = () => {
    // Check if Supabase is connected
    if (!isSupabaseConnected()) {
      toast({
        title: "Supabase not connected",
        description: "Please connect to Supabase first by clicking the Supabase button in the top right corner.",
        variant: "destructive",
      });
      return;
    }
    
    setLoadDialogOpen(true);
  };
  
  // Function to handle web sharing (future feature)
  const handleShare = () => {
    toast({
      title: "Web sharing coming soon",
      description: "We're developing the ability to share proposals via web links.",
    });
  };
  
  // Function to show version history (will implement later)
  const handleViewVersions = () => {
    toast({
      title: "Version history coming soon",
      description: "This feature is not yet implemented.",
    });
  };
  
  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save
            </>
          )}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleLoad}
          disabled={isLoading}
        >
          <FolderOpen className="mr-2 h-4 w-4" />
          Load
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleViewVersions}
        >
          <History className="mr-2 h-4 w-4" />
          Versions
        </Button>

        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleShare}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>

      <LoadProposalDialog 
        open={loadDialogOpen} 
        onOpenChange={setLoadDialogOpen} 
      />
    </>
  );
};

export default ProposalActions;
