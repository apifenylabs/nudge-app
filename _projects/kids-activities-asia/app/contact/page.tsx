export const metadata = {
  title: 'Contact Us | Kids Activities Asia',
  description: 'Get in touch with the Kids Activities Asia team. Suggest an activity, report an issue, or say hello.',
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="text-gray-600 mb-8">
        Have a suggestion for a great kids&apos; activity? Found something that needs updating? 
        We&apos;d love to hear from you.
      </p>

      <form className="space-y-4" action="mailto:hello@kidsactivitiesasia.com" method="GET" encType="text/plain">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input type="text" name="name" className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" name="email" className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea name="message" rows={5} className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300" required></textarea>
        </div>
        <button type="submit" className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors">
          Send Message
        </button>
      </form>
    </div>
  );
}
