import { useState } from 'react';
import { Mail, Phone, User, MessageSquare, Send, CheckCircle, Loader2, MapPin, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import GlassCard from '@/components/ui/GlassCard';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'security@reddefence.io' },
    { icon: Phone, label: 'Phone', value: '+92 (300) 123-4567' },
    { icon: MapPin, label: 'Location', value: 'Karachi, Pakistan' },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <GlassCard variant="blue" className="max-w-md mx-auto text-center py-12 animate-scale-in">
            <div className="inline-flex p-4 rounded-full bg-green-500/20 border border-green-500/50 mb-6">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="font-display text-2xl font-bold mb-4">Message Sent!</h2>
            <p className="text-muted-foreground mb-8">
              Thank you for reaching out. Our security team will respond within 24 hours.
            </p>
            <Button variant="cyberSecondary" onClick={() => setIsSubmitted(false)}>
              Send Another Message
            </Button>
          </GlassCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 mb-6">
            <MessageSquare className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Get in Touch</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-red-blue">Contact Us</span>
          </h1>
          <p className="text-muted-foreground">
            Have questions about our security services? We're here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <GlassCard variant="blue">
            <h2 className="font-display text-xl font-semibold mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-12 bg-input border-border focus:border-secondary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-12 bg-input border-border focus:border-secondary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="+92 (3XX) XXX-XXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-12 bg-input border-border focus:border-secondary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="cyberSecondary"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          </GlassCard>

          {/* Contact Info */}
          <div className="space-y-6">
            <GlassCard variant="red" className="scan-line">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">Red Defence Security</h3>
                  <p className="text-sm text-muted-foreground">Enterprise Cybersecurity Solutions</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                Our team of security experts is available around the clock to assist with your cybersecurity needs. 
                Whether you're looking for a security assessment or need help with incident response, we're here to help.
              </p>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard variant="purple">
              <h3 className="font-display font-semibold mb-4">Need Urgent Help?</h3>
              <p className="text-muted-foreground mb-4">
                For security emergencies and critical incidents, our rapid response team is available 24/7.
              </p>
              <Button variant="cyberPurple" className="w-full">
                <Phone className="w-4 h-4" />
                Emergency Hotline
              </Button>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
