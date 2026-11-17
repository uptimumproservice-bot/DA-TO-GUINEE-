import { useState, useEffect } from 'react';
import { Save, Image as ImageIcon, ShieldAlert, Globe, Building2 } from 'lucide-react';
import { AdminUser, MediaItem, SiteSettings } from '@/types/cms';
import { saveSiteSettings } from '@/services/cmsService';
import { MediaPickerModal } from '@/components/admin/MediaPickerModal';

interface SiteSettingsManagerProps {
  admin: AdminUser;
  settings: Omit<SiteSettings, 'updatedBy' | 'updatedAt'>;
  mediaList: MediaItem[];
  onNotify: (type: 'success' | 'error', msg: string) => void;
}

export function SiteSettingsManager({
  admin,
  settings,
  mediaList,
  onNotify,
}: SiteSettingsManagerProps) {
  const isSuperAdmin = admin.role === 'super_admin';
  const [form, setForm] = useState(settings);
  const [saving, setSaving] = useState(false);
  const [logoPickerTarget, setLogoPickerTarget] = useState<'logoLightUrl' | 'logoDarkUrl' | null>(
    null
  );

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSuperAdmin) return;
    setSaving(true);
    try {
      await saveSiteSettings(form, admin);
      onNotify(
        'success',
        'Paramètres généraux et informations SEO enregistrés et appliqués sur tout le site.'
      );
    } catch (err: any) {
      onNotify('error', err?.message || 'Erreur lors de la sauvegarde des paramètres.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {!isSuperAdmin && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-amber-900 text-xs">
          <ShieldAlert className="w-5 h-5 flex-shrink-0 text-amber-600" />
          <div>
            <p className="font-bold">Consultation seule (Rôle Éditeur)</p>
            <p className="mt-0.5">
              Seul un Super Administrateur peut modifier les paramètres généraux et sensibles du
              site.
            </p>
          </div>
        </div>
      )}

      {/* Identité & Logos */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#F5A623]" />
          <h3 className="text-sm font-bold text-[#0B2C5C]">Identité de l&apos;entreprise &amp; Logos</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nom commercial *
            </label>
            <input
              type="text"
              required
              disabled={!isSuperAdmin}
              value={form.companyName}
              onChange={(e) => setForm((p) => ({ ...p, companyName: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white disabled:bg-slate-50"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Forme juridique / Dénomination légale
            </label>
            <input
              type="text"
              disabled={!isSuperAdmin}
              value={form.legalName || ''}
              onChange={(e) => setForm((p) => ({ ...p, legalName: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white disabled:bg-slate-50"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Slogan officiel *
            </label>
            <input
              type="text"
              required
              disabled={!isSuperAdmin}
              value={form.slogan}
              onChange={(e) => setForm((p) => ({ ...p, slogan: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white disabled:bg-slate-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Logo clair */}
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Logo (En-tête clair)</span>
              {isSuperAdmin && (
                <button
                  type="button"
                  onClick={() => setLogoPickerTarget('logoLightUrl')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#0B2C5C] text-white text-xs font-semibold cursor-pointer"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Changer</span>
                </button>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 h-12 rounded bg-white border border-slate-200 flex items-center justify-center p-1">
                <img
                  src={form.logoLightUrl || '/logo.png'}
                  alt="Logo clair"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <input
                type="text"
                disabled={!isSuperAdmin}
                value={form.logoLightUrl || ''}
                onChange={(e) => setForm((p) => ({ ...p, logoLightUrl: e.target.value }))}
                className="flex-1 px-2.5 py-1.5 rounded border border-slate-300 text-xs bg-white disabled:bg-slate-100"
              />
            </div>
          </div>

          {/* Logo sombre */}
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">
                Logo (Pied de page / Mode sombre)
              </span>
              {isSuperAdmin && (
                <button
                  type="button"
                  onClick={() => setLogoPickerTarget('logoDarkUrl')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#0B2C5C] text-white text-xs font-semibold cursor-pointer"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Changer</span>
                </button>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 h-12 rounded bg-[#0B2C5C] border border-slate-700 flex items-center justify-center p-1">
                <img
                  src={form.logoDarkUrl || '/logo-dark.png'}
                  alt="Logo sombre"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <input
                type="text"
                disabled={!isSuperAdmin}
                value={form.logoDarkUrl || ''}
                onChange={(e) => setForm((p) => ({ ...p, logoDarkUrl: e.target.value }))}
                className="flex-1 px-2.5 py-1.5 rounded border border-slate-300 text-xs bg-white disabled:bg-slate-100"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Coordonnées & Pied de page */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-bold text-[#0B2C5C]">
          Coordonnées de contact &amp; Pied de page
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Téléphone principal *
            </label>
            <input
              type="text"
              required
              disabled={!isSuperAdmin}
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white disabled:bg-slate-50"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Adresse e-mail officielle *
            </label>
            <input
              type="email"
              required
              disabled={!isSuperAdmin}
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white disabled:bg-slate-50"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Adresse affichée *
            </label>
            <input
              type="text"
              required
              disabled={!isSuperAdmin}
              value={form.address}
              onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white disabled:bg-slate-50"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Horaires d&apos;ouverture
            </label>
            <input
              type="text"
              disabled={!isSuperAdmin}
              value={form.hours || ''}
              onChange={(e) => setForm((p) => ({ ...p, hours: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white disabled:bg-slate-50"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Siège social complet
            </label>
            <input
              type="text"
              disabled={!isSuperAdmin}
              value={form.headquarters || ''}
              onChange={(e) => setForm((p) => ({ ...p, headquarters: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white disabled:bg-slate-50"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mention copyright pied de page
            </label>
            <input
              type="text"
              disabled={!isSuperAdmin}
              value={form.footerCopyright || ''}
              onChange={(e) => setForm((p) => ({ ...p, footerCopyright: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white disabled:bg-slate-50"
            />
          </div>
        </div>
      </div>

      {/* Réseaux sociaux */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-bold text-[#0B2C5C]">Réseaux sociaux</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(['facebook', 'linkedin', 'tiktok', 'youtube'] as const).map((net) => (
            <div key={net}>
              <label className="block text-xs font-semibold text-slate-700 mb-1 capitalize">
                {net}
              </label>
              <input
                type="url"
                disabled={!isSuperAdmin}
                value={form.socialLinks?.[net] || ''}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    socialLinks: { ...(p.socialLinks || {}), [net]: e.target.value },
                  }))
                }
                placeholder={`https://${net}.com/...`}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white disabled:bg-slate-50"
              />
            </div>
          ))}
        </div>
      </div>

      {/* SEO */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#F5A623]" />
          <h3 className="text-sm font-bold text-[#0B2C5C]">
            Référencement naturel général (SEO)
          </h3>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Titre SEO par défaut *
            </label>
            <input
              type="text"
              required
              disabled={!isSuperAdmin}
              value={form.seoTitle}
              onChange={(e) => setForm((p) => ({ ...p, seoTitle: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white disabled:bg-slate-50"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Méta-description SEO *
            </label>
            <textarea
              rows={2}
              required
              disabled={!isSuperAdmin}
              value={form.seoDescription}
              onChange={(e) => setForm((p) => ({ ...p, seoDescription: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white disabled:bg-slate-50"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mots-clés SEO (séparés par des virgules)
            </label>
            <input
              type="text"
              disabled={!isSuperAdmin}
              value={form.seoKeywords || ''}
              onChange={(e) => setForm((p) => ({ ...p, seoKeywords: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white disabled:bg-slate-50"
            />
          </div>
        </div>
      </div>

      {isSuperAdmin && (
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0B2C5C] text-white text-sm font-bold hover:bg-[#0E3E7E] cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Enregistrement…' : 'Enregistrer les paramètres'}</span>
          </button>
        </div>
      )}

      <MediaPickerModal
        open={!!logoPickerTarget}
        mediaList={mediaList}
        admin={admin}
        defaultFolder="branding"
        onSelect={({ url }) => {
          if (!logoPickerTarget) return;
          setForm((p) => ({ ...p, [logoPickerTarget]: url }));
        }}
        onClose={() => setLogoPickerTarget(null)}
        onNotify={onNotify}
      />
    </form>
  );
}
