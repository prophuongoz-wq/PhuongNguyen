/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutCompany } from './components/AboutCompany';
import { PropertiesSection } from './components/PropertiesSection';
import { SpecsComparisonTable } from './components/SpecsComparisonTable';
import { PromotionBanner } from './components/PromotionBanner';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CalculatorSection } from './components/CalculatorSection';
import { MapSection } from './components/MapSection';
import { ContactSection } from './components/ContactSection';
import { TestimonialsFAQ } from './components/TestimonialsFAQ';
import { Footer } from './components/Footer';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { BookingModal } from './components/BookingModal';
import { FloatingActions } from './components/FloatingActions';
import { WebhookManagerModal } from './components/WebhookManagerModal';
import { PropertyItem } from './types';
import { PROPERTIES_DATA } from './data/properties';

export default function App() {
  // Modal states
  const [selectedPropertyModal, setSelectedPropertyModal] = useState<PropertyItem | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [isWebhookModalOpen, setIsWebhookModalOpen] = useState<boolean>(false);
  const [bookingPrefill, setBookingPrefill] = useState<{ propertyId?: string; area?: string }>({
    propertyId: 'truong-thinh-building-phu-nhuan',
    area: '',
  });

  // Filter state for properties section
  const [filterCategory, setFilterCategory] = useState<'all' | 'office' | 'warehouse'>('all');

  const handleOpenBooking = (propertyId?: string, area?: string) => {
    setBookingPrefill({
      propertyId: propertyId || 'truong-thinh-building-phu-nhuan',
      area: area || '',
    });
    setIsBookingModalOpen(true);
  };

  const handleSelectPropertyFromHero = (propertyId: string) => {
    const prop = PROPERTIES_DATA.find((p) => p.id === propertyId);
    if (prop) {
      setSelectedPropertyModal(prop);
    }
  };

  const handleFilterChangeFromHero = (category: 'all' | 'office' | 'warehouse') => {
    setFilterCategory(category);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-[#243457] selection:text-white">
      {/* 1. Header / Navbar */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenWebhookSettings={() => setIsWebhookModalOpen(true)}
      />

      {/* 2. Hero Section */}
      <main className="flex-1">
        <Hero
          onSelectProperty={handleSelectPropertyFromHero}
          onOpenBooking={handleOpenBooking}
          onFilterChange={handleFilterChangeFromHero}
        />

        {/* 3. About Company Section (Thông Tin Doanh Nghiệp) */}
        <AboutCompany />

        {/* 4. Featured Properties Section (Danh Mục Bất Động Sản Cho Thuê) */}
        <PropertiesSection
          onOpenDetailModal={(prop) => setSelectedPropertyModal(prop)}
          onOpenBooking={handleOpenBooking}
          filterCategory={filterCategory}
        />

        {/* 5. Specs & Pricing Breakdown */}
        <SpecsComparisonTable onOpenBooking={handleOpenBooking} />

        {/* 6. Special Promotions of this Month (Ưu Đãi Thuê Mặt Bằng Tháng Này) */}
        <PromotionBanner onOpenBooking={handleOpenBooking} />

        {/* 7. Why Choose Us (Thế Mạnh Trường Thịnh Invest) */}
        <WhyChooseUs onOpenBooking={() => handleOpenBooking()} />

        {/* 8. Space & Budget Calculator */}
        <CalculatorSection onOpenBooking={handleOpenBooking} />

        {/* 9. Interactive Map & Location (Bản Đồ Vị Trí Dự Án) */}
        <MapSection />

        {/* 10. Contact & Schedule Tour Form (Form Liên Hệ Nhanh) */}
        <ContactSection
          prefilledPropertyId={bookingPrefill.propertyId}
          prefilledArea={bookingPrefill.area}
        />

        {/* 11. Testimonials & FAQ */}
        <TestimonialsFAQ />
      </main>

      {/* 12. Footer */}
      <Footer
        onOpenBooking={handleOpenBooking}
        onOpenWebhookSettings={() => setIsWebhookModalOpen(true)}
      />

      {/* 13. Floating Action Widgets */}
      <FloatingActions onOpenBooking={() => handleOpenBooking()} />

      {/* 14. Property Detail Modal */}
      <PropertyDetailModal
        property={selectedPropertyModal}
        onClose={() => setSelectedPropertyModal(null)}
        onBookTour={(propId, area) => {
          setSelectedPropertyModal(null);
          handleOpenBooking(propId, area);
        }}
      />

      {/* 15. Quick Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialPropertyId={bookingPrefill.propertyId}
        initialArea={bookingPrefill.area}
      />

      {/* 16. Webhook Google Apps Script Manager Modal */}
      <WebhookManagerModal
        isOpen={isWebhookModalOpen}
        onClose={() => setIsWebhookModalOpen(false)}
      />
    </div>
  );
}
