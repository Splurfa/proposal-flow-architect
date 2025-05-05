
import React, { useState } from 'react';
import { useProposal } from '../../context/ProposalContext';
import { Button } from '../ui/button';
import { Loader2, Save, FolderOpen, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProposalActions: React.FC = () => {
  const { state, saveProposal } = useProposal();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Function to handle saving a proposal
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveProposal();
      toast({
        title: "Proposal saved!",
        description: `Successfully saved "${state.proposalTitle}"`,
      });
    } catch (error) {
      toast({
        title: "Error saving proposal",
        description: "There was a problem saving your proposal.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Function to show the load dialog (will implement later)
  const handleLoad = () => {
    toast({
      title: "Load feature coming soon",
      description: "This feature is not yet implemented.",
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
    <div className="flex space-x-2">
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
    </div>
  );
};

export default ProposalActions;
