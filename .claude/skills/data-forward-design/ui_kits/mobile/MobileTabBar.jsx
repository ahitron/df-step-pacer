/* global React, Icon */

function MobileTabBar({ active, onChange, onAdd }) {
  const items = [
    { id: "home",  label: "Home",  icon: "dashboard" },
    { id: "trends", label: "Trends", icon: "trending-up" },
    { id: "add",   label: "Add",   icon: "plus", primary: true },
    { id: "log",   label: "Log",   icon: "calendar" },
    { id: "me",    label: "You",   icon: "user" },
  ];
  return (
    <div style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      paddingBottom: 28,
      paddingTop: 6,
      background: "var(--df-canvas-translucent)",
      backdropFilter: "blur(20px) saturate(180%)",
      WebkitBackdropFilter: "blur(20px) saturate(180%)",
      borderTop: "1px solid var(--df-line-soft)",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      zIndex: 40,
    }}>
      {items.map(it => {
        if (it.primary) {
          return (
            <button
              key={it.id}
              onClick={onAdd}
              style={{
                all: "unset",
                cursor: "pointer",
                width: 48, height: 48, borderRadius: 999,
                background: "var(--df-clay)",
                color: "var(--df-ink-inverse)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 16px rgba(184,89,58,0.35), 0 2px 4px rgba(184,89,58,0.2)",
                marginBottom: 6,
              }}
            >
              <Icon name="plus" size={22} stroke={2} />
            </button>
          );
        }
        const isActive = active === it.id;
        return (
          <button
            key={it.id}
            onClick={() => onChange && onChange(it.id)}
            style={{
              all: "unset",
              cursor: "pointer",
              padding: "6px 12px",
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              color: isActive ? "var(--df-clay)" : "var(--df-ink-3)",
            }}
          >
            <Icon name={it.icon} size={20} />
            <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.01em" }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

Object.assign(window, { MobileTabBar });
