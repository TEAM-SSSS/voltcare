import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">System Settings</h1>
        <p className="text-muted-foreground">Configure application behavior and global preferences.</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-black/20 backdrop-blur-lg border border-white/10 p-1">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-6">
          <Card className="bg-black/20 backdrop-blur-lg border-white/10">
            <CardHeader>
              <CardTitle>Global Configuration</CardTitle>
              <CardDescription>Basic system identifiers and contact points.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="system-name">System Name</Label>
                <Input id="system-name" defaultValue="VoltCare Smart Portal" className="bg-white/5 border-white/10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-email">Support Contact Email</Label>
                <Input id="admin-email" defaultValue="support@voltcare.com" className="bg-white/5 border-white/10" />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-xs text-muted-foreground">Restrict public access during updates.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
            <CardFooter className="border-t border-white/10 pt-6">
              <Button className="font-bold">Save All Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card className="bg-black/20 backdrop-blur-lg border-white/10">
            <CardHeader>
              <CardTitle>Notification Rules</CardTitle>
              <CardDescription>Configure how alerts are sent to users and admins.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                <div className="space-y-0.5">
                  <Label>Email Alerts</Label>
                  <p className="text-xs text-muted-foreground">Send auto-generated emails for bill generation.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                <div className="space-y-0.5">
                  <Label>SMS Gateway</Label>
                  <p className="text-xs text-muted-foreground">Enable SMS notifications for high priority complaints.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
