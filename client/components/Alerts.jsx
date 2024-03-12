import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DataTable } from '@/components/DataTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function Alerts() {
  return (
    <Tabs defaultValue='Events' className='w-full'>
      <TabsList className='flex max-w-max space-x-2 p-2 mb-4 mx-auto'>
        <TabsTrigger value='default' className=':bg-primary'>
          Default
        </TabsTrigger>
        <TabsTrigger value='by-agent'>By Agent</TabsTrigger>
        <TabsTrigger value='by-event'>By Event</TabsTrigger>
      </TabsList>
      <TabsContent value='default'>
        <Card className='bg-secondary border-secondary'>
          <CardContent className='space-y-2 mt-3'>
            <DataTable />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value='by-agent'>
        <Card className='bg-secondary border-secondary'>
          <CardContent className='space-y-2 mt-3'>
            <div className='space-y-1'>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' defaultValue='Pedro Duarte' />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='username'>Username</Label>
              <Input id='username' defaultValue='@peduarte' />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value='by-event'>
        <Card className='bg-secondary border-secondary'>
          <CardContent className='space-y-2 mt-3'>
            <DataTable />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
